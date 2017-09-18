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
      stepProgress: this.initStepProgress(),
    };
  }

  componentWillReceiveProps(nextProps) {
    // need to re-evaluate all steps
    // need to loop through each step progress in reverse order to get proper evaluation of isDisabled property
    // due to the step can be disabled if a previous step is disabled
    let nextStepProgress = [...this.state.stepProgress];
    let x = nextStepProgress.length - 1;
    while(x >= 0) {
      nextStepProgress[x] = this.evalStep(x, nextProps);

      // decrement x
      x -= 1;
    }

    this.setState({
      stepProgress: nextStepProgress
    });
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

  evalStep(stepIndex, props) {
    const { curStepIndex, stepProgress } = this.state;
    const StepComponent = props.steps[stepIndex];
    const isStepInvalid = this.isStepInvalid(StepComponent.type.formInputs, props.errors);
    const nextStepProgress = [...stepProgress];
    const isActive = this.isStepActive(stepIndex);

    // make sure to update current step for being touched
    // subtract 1 from stup number to get the index
    return Object.assign({}, nextStepProgress[stepIndex], {
      isActive,
      isValid: !isStepInvalid,
      isInvalid: isStepInvalid,
      isDisabled: this.isStepNavDisabled(stepIndex, isActive),
    });
  }

  gotoStep(stepIndex) {
    const { curStepIndex, stepProgress } = this.state;
    const nextStepProgress = [...this.state.stepProgress];

    // make sure to update current step for being touched
    // subtract 1 from stup number to get the index
    nextStepProgress[curStepIndex] = Object.assign({}, this.evalStep(curStepIndex, this.props), {
      isTouched: true,
    });

    this.setState({
      curStepIndex: stepIndex,
      stepProgress: nextStepProgress
    });
  }

  handleCrumbClick(stepIndex) {
    const stepProgress = Object.assign({}, this.state.stepProgress[stepIndex]);

    if (!stepProgress.isDisabled) {
      this.gotoStep(stepIndex);
    }
  }

  initStepProgress() {
    const stepProgress = this.props.steps.map((StepComponent, index) => {
      const stepNumber = index + 1;
      const isInvalid = this.isStepInvalid(StepComponent.type.formInputs, this.props.errors);

      return {
        isActive: (index === 0) ? true : false,
        isDisabled: true,
        isTouched: (index == 0) ? true : false,
        isInvalid,
        isValid: !isInvalid,
        stepNumber,
      }
    });

    return stepProgress;
  }

  isStepActive(stepIndex) {
    const stepProgress = Object.assign({}, this.state.stepProgress[stepIndex]);

    return (stepIndex <= this.state.curStepIndex || stepProgress.isTouched);
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
    const { curStepIndex, stepProgress } = this.state;
    const curStepProgress = stepProgress[stepIndex];

    // is disabled when one of the following occurs
    // 1. Isn't active or is current step.
    // 2. If a previous step isInvalid.
    if (!isStepActive || stepIndex === curStepIndex) {
      return true;
    }

    // need to loop through each previous steps to see if form is invalid
    for (let x = 0; x < stepIndex; x += 1) {
      if (stepProgress[x].isInvalid) {
        return true;
      }
    }

    // if it made it this far, the step is NOT disabled
    return false;
  }

  render() {
    const { completedSteps, curStepIndex, numOfSteps } = this.state;
    const { handleSubmit, saveError, saveLabel, steps } = this.props;

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
      throw 'Step Component requires title property.';
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
      throw 'Step Component requires title property.';
    }
    
    const stepProgress = Object.assign({}, this.state.stepProgress[stepIndex]);

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
      <li key={Util.convertToSlug(stepTitle)} className={stepStyles} disabled={isStepDisabled} role={!isStepDisabled ? 'button' : ''} onClick={this.handleCrumbClick.bind(this, stepIndex) }>{stepTitle}</li>
    )
  }
}

MultiStepForm.propTypes = {
  handleSave: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  saveError: PropTypes.string,
  saveLabel: PropTypes.string,
  steps: PropTypes.array.isRequired,
  errors: PropTypes.object,
};

MultiStepForm.defaultProps = {
  saveLabel: 'Save',
};

MultiStepForm.Step = Step;

export default MultiStepForm;
