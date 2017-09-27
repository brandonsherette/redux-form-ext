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

  shouldComponentUpdate(nextProps, nextState) {
    const curProps = this.props;
    const curState = this.state;
    const hasErrorsChanged = (curProps.errors && nextProps.errors) ?
      (JSON.stringify(curProps.errors) !== JSON.stringify(nextProps.errors)) :
      (curProps.errors !== nextProps.errors);

    let hasStepsChanged = false;

    if (curProps.steps.length === nextProps.steps.length) {
      for (let x = 0; x < curProps.steps.length; x += 1) {
        const curStepProps = curProps.steps[x].props;
        const nextStepProps = nextProps.steps[x].props;

        if (
          curStepProps.stepError !== nextStepProps.stepError ||
          JSON.stringify(curStepProps.formValues) !== JSON.stringify(nextStepProps.formValues)
        ) {
          hasStepsChanged = true;
        }
      }
    } else {
      // the steps length has been changed so needs to be updated
      hasStepsChanged = true;
    }

    return (
      curProps.saveLabel !== nextProps.saveLabel ||
      curProps.saveError !== nextProps.saveError ||
      curProps.isSaving !== nextProps.isSaving ||
      curProps.errors !== nextProps.errors ||
      curState.curStepIndex !== nextState.curStepIndex ||
      curState.stepsTouched.length !== nextState.stepsTouched.length ||
      curProps.steps.length !== nextProps.steps.length ||
      hasErrorsChanged || hasStepsChanged
    );
  }


  evalSubmit(values) {
    const { curStepIndex, numOfSteps } = this.state;

    // check if final step 
    if (curStepIndex + 1 === numOfSteps) {
      // only trigger save if no errors are found throughout the entire app
      if (this.isFormValid()) {
        this.props.handleSave(values);
      }
    } else {
      this.gotoStep(curStepIndex + 1);
    }
  }

  evalStep(stepIndex, StepComponent, errors) {
    const { curStepIndex, stepsTouched } = this.state;
    const isTouched = stepsTouched[stepIndex];
    const isInvalid = this.isStepInvalid(StepComponent, errors);
    const isActive = (stepIndex <= curStepIndex || isTouched);
    const isDisabled = this.isStepNavDisabled(stepIndex, isActive);

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

  isFormValid() {
    const { errors, steps } = this.props;

    // if there anything in errors or if any one of the 
    // step components has a stepInvalid prop set to true, the entire form is invalid
    if (errors) {
      return false;
    }

    // loop through each step and see if isStepInvalid prop is attached
    const stepInvalid = steps.find((StepComponent) => StepComponent.props.stepError);

    return (stepInvalid) ? false : true;
  }

  isStepInvalid(StepComponent, errors) {
    const stepError = StepComponent.props.stepError;
    const formInputs = StepComponent.type.formInputs;

    if (!formInputs && !stepError) {
      return false;
    }

    // manual override of if the step is in an error state
    if (stepError) {
      return true;
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
      if (this.isStepInvalid(this.props.steps[x], this.props.errors)) {
        return true;
      }
    }

    // if it made it this far, the step is NOT disabled
    return false;
  }

  render() {
    const { curStepIndex, numOfSteps } = this.state;
    const { errors, handleSubmit, isSaving, isSavingComponent, saveError, saveLabel, steps } = this.props;
    const CurStepComponent = steps[curStepIndex];
    const curStepError = CurStepComponent.props.stepError;
    const isCurStepInvalid = this.isStepInvalid(CurStepComponent, errors);

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
        <form onSubmit={handleSubmit((values) => { this.evalSubmit(values) })}>
          {saveError && (<div className="alert alert-danger" role="alert">{saveError}</div>)}
          {curStepError && (<div className="step-error">{curStepError}</div>)}
          <div className="form-step-wrapper">
            <div className="multi-step-form__step-wrapper">
              {CurStepComponent}
            </div>
          </div>
          <div className="form-footer">
            <div className="pull-left">
              <button type="button" disabled={curStepIndex === 0} onClick={this.gotoStep.bind(this, curStepIndex - 1)} className="btn btn-primary btn-back"><i className="fa fa-chevron-circle-left"></i>&nbsp;Back</button>
            </div>
            <div className="pull-right">
              {curStepIndex !== numOfSteps - 1 && (<button type="submit" disabled={isCurStepInvalid} className="btn btn-primary btn-next">Next&nbsp;<i className="fa fa-chevron-circle-right"></i></button>)}
              {curStepIndex === numOfSteps - 1 && (<button type="submit" disabled={isCurStepInvalid} className="btn btn-success btn-next"><i className="fa fa-floppy-o"></i>&nbsp;{saveLabel}</button>)}
            </div>
          </div>
        </form>
      </section>
    );
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
      <li key={Util.convertToSlug(stepTitle)} className={stepStyles} disabled={isStepDisabled} role={!isStepDisabled ? 'button' : ''} onClick={this.handleCrumbClick.bind(this, stepIndex, isStepDisabled)}>{stepTitle}</li>
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
