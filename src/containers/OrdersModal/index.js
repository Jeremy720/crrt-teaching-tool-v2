import React, { Component } from "react";
import "./OrdersModal.css";
import { connect } from "react-redux";
import { HashLink as Link } from "react-router-hash-link";
import {
  submitOrder,
  setTime,
  setTimeBetweenOrders,
  validateTimeBetweenOrders,
  addResultsMessagesToOrder,
  recordHourlyTimestamp,
  setCurrentPoints,
  recordSingleOrderTimestamp
} from "../../Actions/ordersActions";
import { addVitals } from "../../Actions/vitals-actions.js";
import { setSelectedModal } from "../../Actions/selection-actions";
import {
  calculateLabData,
  setInputOutputData
} from "../../Actions/calculationActions";
import orderDosages from "../../utils/orderDosages.js";
import InputContainer from "../../components/InputContainer";
import {
  runLabs,
  postLabChecks,
  returnInputOutput,
  returnHistoricalWeight
} from "../../utils/equationsMaster.js";
import orderWarningRanges from "../../utils/resultsEquationsMaster.js";
import ordersResultsMessages from "../../utils/resultsEquationsWarningMaster.js";
const uuidv4 = require("uuid/v4");

export class OrdersModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modality: "Pre-filter CVVH",
      sodium: "",
      potassium: "",
      chloride: "",
      bicarbonate: "",
      calcium: "",
      magnesium: "",
      phosphorous: "",
      grossUltraFiltration: "",
      bloodFlowRate: "",
      replacementFluidFlowRate: "",
      saline3Percent: false,
      d5W: false,
      sodiumPhosphate15mmol100ml: false,
      anticoagulation: "None",
      otherFluidsBolusValue: "",
      otherFluidsInfusionValue: "",
      citrateFlowRate: "",
      caClInfusionRate: "",
      readyForSubmission: false,
      dosageErrors: [],
      currentTime: 10,
      currentDay: 1
      // timeBetweenOrders: 8
    };
  }

  async componentDidUpdate(prevProps) {
    const {
      closeOrdersModal,
      calculateLabData,
      orders,
      timeBetweenOrders,
      selectedCase,
      labData,
      addResultsMessagesToOrder,
      time,
      recordHourlyTimestamp,
      addVitals,
      hourlyTimestamps
    } = this.props;

    if (this.props.orders !== prevProps.orders) {
      let currentOrder = orders[orders.length - 1];
      let newLabData = runLabs(
        orders,
        time,
        timeBetweenOrders,
        selectedCase,
        labData,
        hourlyTimestamps.length
      );

      let inputOutput = returnInputOutput();
      this.combineInputOutputObjects(inputOutput);
      console.log("THE THING WE HOPEFULLY NEED: ", returnHistoricalWeight());
      let combinedLabData = this.addNewLabDataToPreviousLabData(newLabData);
      calculateLabData(combinedLabData);
      let combinedVitalsData = this.combineVitalsData();
      addVitals(combinedVitalsData);

      let resultsMessages = this.checkCurrentOrderResults(
        currentOrder,
        time,
        selectedCase,
        combinedLabData
      );

      addResultsMessagesToOrder(resultsMessages, currentOrder);
      this.incrementTimeBetweenOrders();
      recordHourlyTimestamp(
        this.compileHourlyTimestamps(time, timeBetweenOrders)
      );

      closeOrdersModal();
    }
  }

  combineInputOutputObjects = newInputOutput => {
    let { inputOutputData, setInputOutputData } = this.props;
    let finalInputOutputData = Object.assign({}, inputOutputData);

    finalInputOutputData.citrate = [
      ...finalInputOutputData.citrate,
      ...newInputOutput.citrate
    ];
    finalInputOutputData.calciumChloride = [
      ...finalInputOutputData.calciumChloride,
      ...newInputOutput.calciumChloride
    ];
    finalInputOutputData.totalInput = [
      null,
      null,
      ...newInputOutput.totalInput
    ];
    finalInputOutputData.ultrafiltration = [
      null,
      null,
      ...newInputOutput.ultrafiltration
    ];
    finalInputOutputData.totalOutput = [
      null,
      null,
      ...newInputOutput.totalOutput
    ];
    finalInputOutputData.netInputOutput = [
      null,
      null,
      ...newInputOutput.netInputOutput
    ];
    finalInputOutputData.cumulativeInputOutput = [
      null,
      null,
      ...newInputOutput.cumulativeInputOutput
    ];

    setInputOutputData(finalInputOutputData);
  };

  combineVitalsData = () => {
    let { vitals, timeBetweenOrders } = this.props;
    let finalVitalsData = Object.assign({}, vitals);
    let newWeightArr = returnHistoricalWeight();

    finalVitalsData.weight = [vitals.weight[0]];

    for (var i = 0; i < newWeightArr.length; i++) {
      let nullCounter = 0;

      while (nullCounter < timeBetweenOrders - 1) {
        finalVitalsData.weight = [...finalVitalsData.weight, null];
        nullCounter++;
      }

      finalVitalsData.weight = [...finalVitalsData.weight, newWeightArr[i]];
    }

    return finalVitalsData;
  };

  compileHourlyTimestamps = (time, timeBetweenOrders) => {
    let { recordSingleOrderTimestamp } = this.props;
    let { currentTime, currentDay } = time;
    let finalTimeStampArray = [];
    let startTime = currentTime;
    let timeCounter = 0;
    let dayNumber = currentDay;

    while (timeCounter !== timeBetweenOrders) {

      finalTimeStampArray.push(`${startTime}:00 - Day ${dayNumber}`);

      if (startTime === 23) {
        startTime = 0
        dayNumber++
      } else {
        startTime++
      }

      timeCounter++;
    }

    recordSingleOrderTimestamp(finalTimeStampArray[finalTimeStampArray.length - 1])

    return finalTimeStampArray;
  };

  addNewLabDataToPreviousLabData = newLabData => {
    let { labData } = this.props;
    let finalLabData = Object.assign({}, labData);

    finalLabData.time = [...labData.time, newLabData.time];
    finalLabData.sodium = [...labData.sodium, parseFloat(newLabData.sodium)];
    finalLabData.potassium = [
      ...labData.potassium,
      parseFloat(newLabData.potassium)
    ];
    finalLabData.chloride = [
      ...labData.chloride,
      parseFloat(newLabData.chloride)
    ];
    finalLabData.bicarbonate = [
      ...labData.bicarbonate,
      parseFloat(newLabData.bicarbonate)
    ];
    finalLabData.bun = [...labData.bun, parseFloat(newLabData.bun)];
    finalLabData.creatinine = [
      ...labData.creatinine,
      parseFloat(newLabData.creatinine)
    ];
    finalLabData.calcium = [...labData.calcium, parseFloat(newLabData.calcium)];
    finalLabData.phosphorous = [
      ...labData.phosphorous,
      parseFloat(newLabData.phosphorous)
    ];
    finalLabData.filtrationFraction = [
      ...labData.filtrationFraction,
      parseFloat(newLabData.filtrationFraction)
    ];
    finalLabData.ionizedCalcium = [
      ...labData.ionizedCalcium,
      parseFloat(newLabData.ionizedCalcium)
    ];
    finalLabData.magnesium = [
      ...labData.magnesium,
      parseFloat(newLabData.magnesium)
    ];
    finalLabData.ph = [...labData.ph, parseFloat(newLabData.ph)];

    return finalLabData;
  };

  checkCurrentOrderResults = (currentOrder, time, selectedCase, labData) => {
    //checks current order's Redux labData output against ranges each case, then prints according warning messages stored in utils/orderResultsData.js
    //if there are warnings, add them to messages array
    //if there are no warnings, add 'CRRT is running smoothly. There were no reported issues since the previous update.' to messages array

    // const warningRangeKeys = Object.keys(selectedCase.warningRanges);
    // const warningRangesStringified = this.props.selectedCase.warningRanges;
    // const warningRanges = JSON.parse(warningRangesStringified);
    let { setCurrentPoints } = this.props;

    let totalPoints = postLabChecks(currentOrder, time, selectedCase, labData);
    setCurrentPoints(totalPoints);

    const warningRangeKeys = Object.keys(orderWarningRanges[selectedCase.id]);
    const defaultMessage =
      "CRRT is running smoothly. There were no reported issues since the previous update.";
    let messages = [];
    const results = warningRangeKeys.reduce((allMessages, medication) => {
      const belowRangeMessage = this.checkResultsForBelowRange(
        medication,
        selectedCase.id,
        labData
      );
      const aboveRangeMessage = this.checkResultsForAboveRange(
        medication,
        selectedCase.id,
        labData
      );

      if (
        belowRangeMessage.length &&
        !allMessages.includes(belowRangeMessage) &&
        !allMessages.includes(aboveRangeMessage)
      ) {
        allMessages.push(belowRangeMessage);
      }
      if (
        aboveRangeMessage.length &&
        !allMessages.includes(aboveRangeMessage) &&
        !allMessages.includes(belowRangeMessage)
      ) {
        allMessages.push(aboveRangeMessage);
      }
      return allMessages;
    }, []);

    if (results.length) {
      messages = results;
    } else {
      messages.push(defaultMessage);
    }

    return messages;
  };

  checkResultsForBelowRange = (medication, caseId, labData) => {
    let message = "";
    // const warningRangesStringified = this.props.selectedCase.warningRanges;
    // const warningRanges = JSON.parse(warningRangesStringified);
    // const warningRangesStringified = this.props.selectedCase.warningRanges;
    const warningRanges = orderWarningRanges[caseId];

    if (labData[medication]) {
      const mostRecentLabResult =
        labData[medication][labData[medication].length - 1];
      const { belowRange } = warningRanges[medication];

      for (let range in belowRange) {
        if (belowRange[range] !== null) {
          console.log(`MOST RECENT ${medication}: `, mostRecentLabResult);
          console.log("BELOWRANGE[range]: ", belowRange[range]);
          if (mostRecentLabResult < belowRange[range]) {
            message =
              ordersResultsMessages[caseId][medication].belowRange[range];
          }
        }
      }
    }
    return message;
  };

  checkResultsForAboveRange = (medication, caseId, labData) => {
    let message = "";
    // const warningRangesStringified = this.props.selectedCase.warningRanges;
    // const warningRanges = JSON.parse(warningRangesStringified);
    // const warningRangesStringified = this.props.selectedCase.warningRanges;
    const warningRanges = orderWarningRanges[caseId];

    if (labData[medication]) {
      const mostRecentLabResult =
        labData[medication][labData[medication].length - 1];
      const { aboveRange } = warningRanges[medication];

      for (let range in aboveRange) {
        if (aboveRange[range] !== null) {
          if (mostRecentLabResult > aboveRange[range]) {
            message =
              ordersResultsMessages[caseId][medication].aboveRange[range];
          }
        }
      }
    }
    return message;
  };

  handleStringChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () =>
      this.checkForInvalidInputs(name, value)
    );
  };

  handleNumberChange = event => {
    const { name, value } = event.target;

    this.setState(
      {
        [name]: value.trim()
      },
      () => this.checkForInvalidInputs(name)
    );
  };

  checkForInvalidInputs = name => {
    const { requiredRanges, replacementFluidDosages } = orderDosages;
    const { dosageErrors } = this.state;
    let invalidEntries = [];
    const staticInputs = [
      "modality",
      "saline3Percent",
      "d5W",
      "sodiumPhosphate15mmol100ml",
      "anticoagulation",
      "readyForSubmission",
      "otherFluidsBolusValue",
      "otherFluidsInfusionValue",
      "citrateFlowRate",
      "caClInfusionRate"
    ];

    if (staticInputs.includes(name)) {
      return;
    }
    if (!name) {
      invalidEntries = replacementFluidDosages.reduce(
        (wrongValues, medication) => {
          if (
            this.state[medication] < requiredRanges[medication].min ||
            this.state[medication] > requiredRanges[medication].max
          ) {
            wrongValues.push(medication);
          }

          return wrongValues;
        },
        []
      );
    } else if (name) {
      invalidEntries = [name];

      if (
        this.state[name] < requiredRanges[name].min ||
        this.state[name] > requiredRanges[name].max
      ) {
        this.setState({
          dosageErrors: [...dosageErrors, ...invalidEntries],
          readyForSubmission: false
        });
      } else {
        this.setState(
          {
            dosageErrors: this.checkDosageErrors(name)
          },
          () => this.checkIfReadyForSubmission()
        );
      }
    }

    return invalidEntries;
  };

  checkDosageErrors = invalidEntry => {
    const { dosageErrors } = this.state;
    let newDosageErrors = [];

    newDosageErrors = dosageErrors.filter(elementName => {
      return elementName !== invalidEntry;
    });

    return newDosageErrors;
  };

  checkIfReadyForSubmission = () => {
    const { timeBetweenOrdersIsValid } = this.props;
    const { dosageErrors } = this.state;

    if (dosageErrors.length || !timeBetweenOrdersIsValid) {
      this.setState({ readyForSubmission: false });
    } else {
      this.setState({ readyForSubmission: true });
    }
  };

  validateOrder = () => {
    const { timeBetweenOrdersIsValid } = this.props;
    const invalidEntries = this.checkForInvalidInputs();

    if (timeBetweenOrdersIsValid && invalidEntries.length === 0) {
      this.setState({ dosageErrors: [] }, () =>
        this.checkIfReadyForSubmission()
      );
    } else if (!timeBetweenOrdersIsValid || invalidEntries.length !== 0) {
      this.checkIfReadyForSubmission();
    }
  };

  compileOrder = () => {
    const { timeBetweenOrders } = this.props;
    let {
      modality,
      sodium,
      potassium,
      chloride,
      bicarbonate,
      magnesium,
      phosphorous,
      grossUltraFiltration,
      bloodFlowRate,
      replacementFluidFlowRate,
      saline3Percent,
      d5W,
      sodiumPhosphate15mmol100ml,
      anticoagulation,
      otherFluidsBolusValue,
      otherFluidsInfusionValue,
      citrateFlowRate,
      caClInfusionRate
    } = this.state;

    let calcium = this.state.calcium * 4;

    const order = {
      id: uuidv4(),
      timeStamp: this.createTimeStamp(),
      fluidDialysateValues: {
        sodium: parseFloat(sodium),
        potassium: parseFloat(potassium),
        chloride: parseFloat(chloride),
        bicarbonate: parseFloat(bicarbonate),
        calcium: parseFloat(calcium),
        magnesium: parseFloat(magnesium),
        phosphorous: parseFloat(phosphorous),
        bun: 0,
        creatinine: 0
      },
      modality,
      anticoagulation,
      BFR: parseFloat(bloodFlowRate),
      Qr: parseFloat(replacementFluidFlowRate),
      Qd: parseFloat(replacementFluidFlowRate),
      grossUF: parseFloat(grossUltraFiltration),
      timeToNextLabs: parseFloat(timeBetweenOrders),
      otherFluidsSaline: saline3Percent,
      otherFluidsD5W: d5W,
      otherFluidsSodiumPhosphate: sodiumPhosphate15mmol100ml,
      otherFluidsBolusValue,
      otherFluidsInfusionValue,
      citrateFlowRate,
      caClInfusionRate
    };

    return order;
  };

  // Creating TimeStamp Start

  createTimeStamp = () => {
    const { time } = this.props;
    const { currentTime, currentDay } = time;
    return `${currentTime}:00 - Day ${currentDay}`;
  };

  handletimeBetweenOrdersChange = async event => {
    const { value } = event.target;
    const timeBetweenOrders = await this.validateEnteredTimeBetweenOrders(
      value
    );
    await this.props.setTimeBetweenOrders(timeBetweenOrders);
    this.validateOrder();
  };

  validateEnteredTimeBetweenOrders = enteredTime => {
    const { validateTimeBetweenOrders } = this.props;
    const parsedTime = parseFloat(enteredTime);
    if (!isNaN(parsedTime)) {
      if (parsedTime >= 2 && parsedTime <= 24) {
        validateTimeBetweenOrders(true);
        return Math.round(parsedTime);
      } else {
        validateTimeBetweenOrders(false);
        return parsedTime;
      }
    } else {
      validateTimeBetweenOrders(false);
      return enteredTime;
    }
  };

  incrementTimeBetweenOrders = () => {
    let { currentTime, currentDay } = this.props.time;
    const { timeBetweenOrders } = this.props;

    currentTime += timeBetweenOrders;

    if (currentTime >= 23) {
      currentTime -= 24;
      currentDay++;
    }

    const newTime = {
      currentTime,
      currentDay
    };
    this.props.setTime(newTime);
  };

  // Creating TimeStamp End

  submitNewOrder = event => {
    event.preventDefault();
    const newOrder = this.compileOrder();
    this.props.submitOrder(newOrder);
    this.props.setSelectedModal("");
    // this.props.closeOrdersModal()
  };

  toggleCheckBoxes = event => {
    const { name } = event.target;
    if (name === "saline3Percent") {
      this.setState({ [name]: !this.state[name], d5W: false });
    } else if (name === "d5W") {
      this.setState({ [name]: !this.state[name], saline3Percent: false });
    } else {
      this.setState({ [name]: !this.state[name] });
    }
  };

  clearInputs = event => {
    event.preventDefault();
    this.setState({
      modality: "Pre-filter CVVH",
      sodium: "",
      potassium: "",
      chloride: "",
      bicarbonate: "",
      calcium: "",
      magnesium: "",
      phosphorous: "",
      grossUltraFiltration: "",
      bloodFlowRate: "",
      replacementFluidFlowRate: "",
      saline3Percent: false,
      d5W: false,
      sodiumPhosphate15mmol100ml: false,
      anticoagulation: "None",
      readyForSubmission: false,
      dosageErrors: []
      // timeBetweenOrders: 8
    });
  };

  fillFormWithUpdatedValues = e => {
    e.preventDefault();
    const { orders } = this.props;
    if (!orders.length) {
      this.fillFormWithDefaultValues(e);
      return;
    } else {
      let currentOrder = orders[orders.length - 1];

      const {
        modality,
        grossUF,
        BFR,
        Qr,
        otherFluidsSaline,
        otherFluidsD5W,
        otherFluidsSodiumPhosphate,
        anticoagulation,
        otherFluidsBolusValue,
        otherFluidsInfusionValue,
        citrateFlowRate,
        caClInfusionRate
      } = currentOrder;

      let {
        sodium,
        potassium,
        chloride,
        bicarbonate,
        magnesium,
        phosphorous
      } = currentOrder.fluidDialysateValues;

      let calcium = currentOrder.fluidDialysateValues.calcium / 4;

      this.setState(
        {
          modality,
          sodium,
          potassium,
          chloride,
          bicarbonate,
          calcium,
          magnesium,
          phosphorous,
          grossUltraFiltration: grossUF,
          bloodFlowRate: BFR,
          replacementFluidFlowRate: Qr,
          saline3Percent: otherFluidsSaline,
          d5W: otherFluidsD5W,
          sodiumPhosphate15mmol100ml: otherFluidsSodiumPhosphate,
          anticoagulation: anticoagulation,
          otherFluidsBolusValue,
          otherFluidsInfusionValue,
          citrateFlowRate,
          caClInfusionRate
        },
        () => this.validateOrder()
      );
    }
  };

  fillFormWithDefaultValues = event => {
    event.preventDefault();
    this.setState(
      {
        modality: "Pre-filter CVVH",
        sodium: 140,
        potassium: 3.6,
        chloride: 100,
        bicarbonate: 24,
        calcium: 2,
        magnesium: 1.7,
        phosphorous: 0.5,
        grossUltraFiltration: 500,
        bloodFlowRate: 200,
        replacementFluidFlowRate: 2
      },
      () => this.validateOrder()
    );
  };

  render() {
    const {
      modality,
      saline3Percent,
      d5W,
      sodiumPhosphate15mmol100ml,
      readyForSubmission
    } = this.state;

    const { orders, closeOrdersModal, timeBetweenOrders } = this.props;

    const {
      replacementFluidDosages,
      modalityDosages,
      anticoagulationDosages,
      otherFluidDosages,
      citrateDosages
    } = orderDosages;

    return (
      <form className="OrdersModal">
        <div className="orders-modal-sidebar"></div>
        <div
          className={
            !orders.length
              ? "orders-modal-main-content"
              : "orders-modal-main-content-no-interval-input"
          }
        >
          <header className="orders-modal-header">
            <h2 className="orders-modal-h2">Orders</h2>
            <div className="orders-modal-header-button-container">
              <button
                className="prov-values-btn"
                onClick={event => this.fillFormWithUpdatedValues(event)}
              >
                Add previous values
              </button>
              <button
                className="orders-modal-close-btn-top"
                onClick={event => closeOrdersModal(event)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </header>

          <section className="OrdersModal-all-InputContainers">
            <section className="orders-replacement-fluid-container">
              <div className="header-info-container">
                <h3 className="orders-modal-section-header">
                  {modality === "CVVHD"
                    ? "Dialysate Fluid"
                    : "Replacement Fluid"}
                </h3>
                <Link
                  to="/textbook#replacement-fluid"
                  className="textbook-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="far fa-question-circle"></i>
                </Link>
              </div>

              <InputContainer
                className="input-container-main"
                type={"number"}
                currentInputState={this.state}
                handleInputChange={this.handleNumberChange}
                dosagesToDisplay={replacementFluidDosages}
                radioButtonCategory={null}
              />
            </section>
            <section className="OrdersModal-right-half">
              {!orders.length && (
                <div className="timeBetweenOrders-container">
                  <h3 className="timeBetweenOrders-label">
                    Time Between Orders
                  </h3>
                  <input
                    type="text"
                    // pattern="[0-9]*"
                    className="timeBetweenOrders-input"
                    name={"timeBetweenOrders"}
                    value={timeBetweenOrders}
                    onChange={event =>
                      this.handletimeBetweenOrdersChange(event)
                    }
                  />
                </div>
              )}
              <section className="orders-modality-container">
                <div className="header-info-container">
                  <h3 className="orders-modal-section-header">Modality</h3>
                  <Link
                    to="/textbook#modality"
                    className="textbook-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="far fa-question-circle"></i>
                  </Link>
                </div>

                <InputContainer
                  type={"radio"}
                  currentInputState={this.state}
                  handleInputChange={this.handleStringChange}
                  dosagesToDisplay={modalityDosages}
                  radioButtonCategory={"modality"}
                />
              </section>

              <section className="orders-modality-other-container">
                <h3 className="orders-modal-section-header">
                  Other Fluids/Medications
                </h3>
                <div className="other-fluids-meds-checkbox">
                  <label className="modality-checkbox-label">
                    <input
                      type="checkbox"
                      name="saline3Percent"
                      value={saline3Percent}
                      checked={saline3Percent === true}
                      onChange={event => this.toggleCheckBoxes(event)}
                    />
                    Saline 3%
                    <Link
                      to="/textbook#hypertonic-saline"
                      className="textbook-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="far fa-question-circle"></i>
                    </Link>
                  </label>
                </div>

                <div className="other-fluids-meds-checkbox">
                  <label className="modality-checkbox-label">
                    <input
                      type="checkbox"
                      name="d5W"
                      value={d5W}
                      checked={d5W === true}
                      onChange={event => this.toggleCheckBoxes(event)}
                    />
                    D5W
                    <Link
                      to="/textbook#D5W"
                      className="textbook-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="far fa-question-circle"></i>
                    </Link>
                  </label>
                </div>

                <div className="other-fluids-meds-checkbox">
                  <label className="modality-checkbox-label">
                    <input
                      type="checkbox"
                      name="sodiumPhosphate15mmol100ml"
                      value={sodiumPhosphate15mmol100ml}
                      checked={sodiumPhosphate15mmol100ml === true}
                      onChange={event => this.toggleCheckBoxes(event)}
                    />
                    Sodium Phosphate (15mmol and 100mL)
                  </label>
                </div>

                {(saline3Percent === true || d5W === true) && (
                  <InputContainer
                    className="input-container-other-fluids-bolus-cont-infusion"
                    type={"number"}
                    currentInputState={this.state}
                    handleInputChange={this.handleNumberChange}
                    dosagesToDisplay={otherFluidDosages}
                    radioButtonCategory={null}
                    d5W={d5W}
                    saline3Percent={saline3Percent}
                  />
                )}

                <h3 className="orders-modal-section-header citrate-header">
                  Citrate
                </h3>
                <InputContainer
                  className="input-container-citrate"
                  type={"radio"}
                  currentInputState={this.state}
                  handleInputChange={this.handleStringChange}
                  dosagesToDisplay={anticoagulationDosages}
                  radioButtonCategory={"anticoagulation"}
                />

                <InputContainer
                  className="input-container-anticoagulation"
                  type={"number"}
                  currentInputState={this.state}
                  handleInputChange={this.handleNumberChange}
                  dosagesToDisplay={citrateDosages}
                  radioButtonCategory={null}
                />
              </section>
            </section>
          </section>

          <footer className="orders-modal-footer">
            <button
              className={
                readyForSubmission
                  ? "submit-case-btn footer-btn submit-btn-active"
                  : "submit-case-btn footer-btn submit-btn-inactive"
              }
              onClick={event => this.submitNewOrder(event)}
              disabled={!readyForSubmission}
            >
              Submit
            </button>
            <button
              className="clear-order-inputs-btn footer-btn"
              onClick={event => this.clearInputs(event)}
            >
              Reset
            </button>
            <button
              className="orders-modal-close-btn-bottom footer-btn"
              onClick={event => closeOrdersModal(event)}
            >
              Close
            </button>
          </footer>
        </div>
      </form>
    );
  }
}

export const mapStateToProps = ({
  orders,
  time,
  timeBetweenOrders,
  timeBetweenOrdersIsValid,
  selectedCase,
  labData,
  inputOutputData,
  vitals,
  hourlyTimestamps
}) => ({
  orders,
  time,
  timeBetweenOrders,
  timeBetweenOrdersIsValid,
  selectedCase,
  labData,
  inputOutputData,
  vitals,
  hourlyTimestamps
});

export const mapDispatchToProps = dispatch => ({
  submitOrder: order => dispatch(submitOrder(order)),
  setTime: newTime => dispatch(setTime(newTime)),
  setTimeBetweenOrders: TimeBetweenOrders =>
    dispatch(setTimeBetweenOrders(TimeBetweenOrders)),
  validateTimeBetweenOrders: isValid =>
    dispatch(validateTimeBetweenOrders(isValid)),
  calculateLabData: newLabData => dispatch(calculateLabData(newLabData)),
  setInputOutputData: newInputOutput =>
    dispatch(setInputOutputData(newInputOutput)),
  addVitals: vitals => dispatch(addVitals(vitals)),
  addResultsMessagesToOrder: (resultsMessages, id) =>
    dispatch(addResultsMessagesToOrder(resultsMessages, id)),
  setCurrentPoints: newPoints => dispatch(setCurrentPoints(newPoints)),
  setSelectedModal: modal => dispatch(setSelectedModal(modal)),
  recordHourlyTimestamp: timeStamps =>
    dispatch(recordHourlyTimestamp(timeStamps)),
  recordSingleOrderTimestamp: timeStamp =>
    dispatch(recordSingleOrderTimestamp(timeStamp))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdersModal);
