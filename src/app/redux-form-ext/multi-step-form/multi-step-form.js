import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Step from './step';
import Util from './util';

// require stylesheet
require('./styles/index.scss');

class MultiStepForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      curStepIndex: 0,
      numOfSteps: props.steps.length,
      stepsTouched: [],
    };
  }

  evalSubmit(values) {
    const { curStepIndex, numOfSteps } = this.state;

    // check if final step 
    if (curStepIndex + 1 === numOfSteps) {
      // only trigger save if no errors are found throughout the entire app
      if (!this.props.errors) {
        this.props.handleSave(values);
      }
    } else {
      this.gotoStep(curStepIndex + 1);
    }
  }

  evalStep(stepIndex, StepComponent, errors) {
    const { curStepIndex, stepsTouched } = this.state;
    const isTouched = stepsTouched[stepIndex];
    const isInvalid = this.isStepInvalid(StepComponent.type.formInputs, errors);
    const isActive = (stepIndex <= curStepIndex || isTouched);
    const isDisabled = this.isStepNavDisabled(stepIndex, isActive);
    
    // make sure to update current step for being touched
    // subtract 1 from stup number to get the index
    return {
      isActive,
      isValid: !isInvalid,
      isInvalid,
      isTouched,
      isDisabled,
    };
  }

  gotoStep(stepIndex) {
    const stepsTouched = [...this.state.stepsTouched];
    stepsTouched[this.state.curStepIndex] = this.state.curStepIndex;
    stepsTouched[stepIndex] = stepIndex;

    this.setState({
      curStepIndex: stepIndex,
      stepsTouched,
    });
  }

  handleCrumbClick(stepIndex, isDisabled) {
    if (!isDisabled) {
      this.gotoStep(stepIndex);
    }
  }

  isStepInvalid(formInputs, errors) {
    if (!formInputs) {
      return false;
    }

    if (!Array.isArray(formInputs)) {
      throw 'MultiStepForm.Step formInputs must be an array.';
    }

    for (let x = 0; x < formInputs.length; x += 1) {
      const input = formInputs[x];

      for (let key in errors) {
        // input is in the array map, so this step is invalid, return true
        // use the key in errors, the value is the text of the warning/error wherease key is the actual name of the input
        if (input === key) {
          return true;
        }
      }
    }

    return false;
  }

  isStepNavDisabled(stepIndex, isStepActive) {
    const { curStepIndex } = this.state;

    // is disabled when one of the following occurs
    // 1. Isn't active or is current step.
    // 2. If a previous step isInvalid.
    if (!isStepActive || stepIndex === curStepIndex) {
      return true;
    }

    // need to loop through each previous steps to see if form is invalid
    for (let x = 0; x < stepIndex; x += 1) {
      if (this.isStepInvalid(this.props.steps[x].type.formInputs, this.props.errors)) {
        return true;
      }
    }

    // if it made it this far, the step is NOT disabled
    return false;
  }

  render() {
    const { curStepIndex, numOfSteps } = this.state;
    const { handleSubmit, isSaving, isSavingComponent, saveError, saveLabel, steps } = this.props;

    if (isSaving) {
      return (
        <section className="multi-step-form">
          {isSavingComponent}
        </section>
      );
    }

    return (
      <section className="multi-step-form">
        <div className="multi-step-breadcrumb-wrapper">
          <ol className="multi-step-breadcrumb">
            {steps.map((step, index) => {
              return this.renderStepBreadcrumb(step, index);
            })}
          </ol>
        </div>
        <form onSubmit={handleSubmit((values) => { this.evalSubmit(values) }) }>
          {saveError && (<div className="alert alert-danger" role="alert"><strong>Error!</strong> {saveError}</div>)}
          <div className="form-step-wrapper">
            {steps.map((step, index) => {
              return this.renderStep(step, index);
            })}
          </div>
          <div className="form-footer">
            <div className="pull-left">
              <button type="button" disabled={curStepIndex === 0} onClick={this.gotoStep.bind(this, curStepIndex - 1) } className="btn btn-primary btn-back"><i className="fa fa-chevron-circle-left"></i>&nbsp;Back</button>
            </div>
            <div className="pull-right">
              {curStepIndex !== numOfSteps - 1 && (<button type="submit" className="btn btn-primary btn-next">Next&nbsp;<i className="fa fa-chevron-circle-right"></i></button>) }
              {curStepIndex === numOfSteps - 1 && (<button type="submit" className="btn btn-success btn-next"><i className="fa fa-floppy-o"></i>&nbsp;{saveLabel}</button>) }
            </div>
          </div>
        </form>
      </section>
    );
  }

  renderStep(StepComponent, stepIndex) {
    // StepComponent needs title to create proper key
    if (!StepComponent.props.title) {
      throw 'Step Component (' + StepComponent.type.name + ') requires title property.';
    }

    const { curStepIndex } = this.state;

    if (stepIndex === curStepIndex && StepComponent) {
      return (
        <div className="multi-step-form__step-wrapper" key={Util.convertToSlug(StepComponent.props.title)}>
          {StepComponent}
        </div>
      );
    }

    return null;
  }

  renderStepBreadcrumb(StepComponent, stepIndex) {
    // StepComponent needs title to create proper key
    if (!StepComponent.props.title) {
      throw 'Step Component (' + StepComponent.type.name + ') requires title property.';
    }
    
    const { errors } = this.props;
    const stepProgress = this.evalStep(stepIndex, StepComponent, errors);

    const { curStepIndex } = this.state;
    const stepTitle = StepComponent.props.title;
    const isStepDisabled = stepProgress.isDisabled;
    const isStepActive = stepProgress.isActive;
    const stepStyles = classNames(
      'item',
      {
        'active': isStepActive,
        'active-item': curStepIndex === stepIndex,
        'disabled': isStepDisabled,
        'invalid': stepProgress.isInvalid && isStepActive && curStepIndex !== stepIndex,
        'valid': stepProgress.isValid && isStepActive
      }
    );

    return (
      <li key={Util.convertToSlug(stepTitle)} className={stepStyles} disabled={isStepDisabled} role={!isStepDisabled ? 'button' : ''} onClick={this.handleCrumbClick.bind(this, stepIndex, isStepDisabled) }>{stepTitle}</li>
    )
  }
}

MultiStepForm.propTypes = {
  handleSave: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool.isRequired,
  isSavingComponent: PropTypes.node,
  saveError: PropTypes.string,
  saveLabel: PropTypes.string,
  steps: PropTypes.array.isRequired,
  errors: PropTypes.object,
};

MultiStepForm.defaultProps = {
  isSavingComponent: (<div className="saving">Saving...</div>),
  saveLabel: 'Save',
};

MultiStepForm.Step = Step;

export default MultiStepForm;
