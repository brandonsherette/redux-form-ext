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

    console.debug('in constructor');

    this.state = {
      curStepNumber: 1,
      completedSteps: [],
      stepProgress: [1],
      numOfSteps: this.props.steps.length
    };
  }

  evalSubmit(values) {
    const { completedSteps, curStepNumber, numOfSteps } = this.state;

    // check if final step 
    if (curStepNumber === numOfSteps) {
      this.props.handleSave(values);
    } else {
      // goto next step 

      // add to completed steps if new index
      const isCompletedStepNew = completedSteps.indexOf(curStepNumber);

      if (isCompletedStepNew) {
        this.setState({
          completedSteps: [...completedSteps, curStepNumber]
        });
      }

      this.gotoStep(curStepNumber + 1);
    }
  }

  gotoStep(stepNumber) {
    const { stepProgress } = this.state;

    // check if step is already in array 
    if (stepProgress.indexOf(stepNumber) === -1) {
      stepProgress.push(stepNumber);
    }

    this.setState({
      curStepNumber: stepNumber,
      stepProgress: [...stepProgress]
    });
  }

  handleCrumbClick(stepNumber) {
    if (!this.isStepNavDisabled(stepNumber)) {
      this.gotoStep(stepNumber);
    }
  }

  isStepActive(stepNumber) {
    return (stepNumber <= this.state.curStepNumber);
  }

  isStepNavDisabled(stepNumber) {
    const { stepProgress } = this.state;

    return (stepProgress.indexOf(stepNumber) < 0) ? true : false;
  }

  render() {
    const { completedSteps, curStepNumber, numOfSteps } = this.state;
    const { handleSubmit, saveError, steps } = this.props;

    console.debug('state', this.state, 'props', this.props);

    return (
      <section className="multi-step-form">
        <div className="multi-step-breadcrumb-wrapper">
          <ol className="multi-step-breadcrumb">
            {steps.map((step, index) => {
              return this.renderStepBreadcrumb(step, index + 1);
            })}
          </ol>
        </div>
        <form onSubmit={handleSubmit((values) => { this.evalSubmit(values) }) }>
          {saveError && (<div className="alert alert-danger" role="alert"><strong>Error!</strong> {saveError}</div>)}
          <div className="form-step-wrapper">
            {steps.map((step, index) => {
              return this.renderStep(step, index + 1);
            })}
          </div>
          <div className="form-footer">
            <div className="pull-left">
              <button type="button" disabled={curStepNumber === 1} onClick={this.gotoStep.bind(this, curStepNumber - 1) } className="btn btn-primary btn-back"><i className="fa fa-chevron-circle-left"></i>&nbsp;Back</button>
            </div>
            <div className="pull-right">
              {curStepNumber !== numOfSteps && (<button type="submit" className="btn btn-primary btn-next">Next&nbsp; <i className="fa fa-chevron-circle-right"></i></button>) }
              {curStepNumber === numOfSteps && (<button type="submit" className="btn btn-success btn-next"><i className="fa fa-floppy-o"></i>&nbsp; Save</button>) }
            </div>
          </div>
        </form>
      </section>
    );
  }

  renderStep(StepComponent, stepNumber) {
    const { curStepNumber } = this.state;
    const isStepDisabled = (this.isStepNavDisabled(stepNumber));

    const stepStyles = classNames(
      'item',
      {
        'active': this.isStepActive(stepNumber),
        'disabled': isStepDisabled
      }
    );

    if (stepNumber === curStepNumber && StepComponent) {
      return (
        <div className="multi-step-form__step-wrapper" key={Util.convertToSlug(StepComponent.props.title)}>
          {StepComponent}
        </div>
      );
    }

    return null;
  }

  renderStepBreadcrumb(StepComponent, stepNumber) {
    const isStepDisabled = (this.isStepNavDisabled(stepNumber));
    const stepTitle = StepComponent.props.title;
    const stepStyles = classNames(
      'item',
      {
        'active': this.isStepActive(stepNumber),
        'disabled': isStepDisabled
      }
    );

    return (
      <li key={Util.convertToSlug(stepTitle)} className={stepStyles} disabled={isStepDisabled} role={!isStepDisabled ? 'button' : ''} onClick={this.handleCrumbClick.bind(this, stepNumber) }>{stepTitle}</li>
    )
  }
}

MultiStepForm.propTypes = {
  handleSave: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  saveError: PropTypes.string,
  steps: PropTypes.array.isRequired
};

MultiStepForm.Step = Step;

export default MultiStepForm;
