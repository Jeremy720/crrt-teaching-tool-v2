const defaultTimeState = {
  currentTime: 10,
  currentDay: 1
};

const defaultResultsMessagesState = [
  {
    id: "default",
    messages: [
      "Welcome to the CRRT education application simulator! Important information about the current case will appear in this box."
    ],
    timeStamp: null
  }
];

export const ordersReducer = (state = [], action) => {
  switch (action.type) {
    case "SUBMIT_ORDER":
      if (action.order !== 'reset') {
        return [...state, action.order];
      } else {
        return []
      }
    default:
      return state;
  }
};

export const timeReducer = (state = defaultTimeState, action) => {
  const { currentTime, currentDay } = action;
  switch (action.type) {
    case "SET_TIME":
      return {
        currentTime,
        currentDay
      };
    default:
      return state;
  }
};

export const timeBetweenOrdersReducer = (state = 0, action) => {
  switch (action.type) {
    case "SET_TIME_BETWEEN_ORDERS":
      return action.timeBetweenOrders;
    default:
      return state;
  }
};

export const validateTimeBetweenOrdersReducer = (state = false, action) => {
  switch (action.type) {
    case "VALIDATE_TIME_BETWEEN_ORDERS":
      return action.timeBetweenOrdersIsValid;
    default:
      return state;
  }
};

export const addResultsMessagesToOrderReducer = (
  state = defaultResultsMessagesState,
  action
) => {
  switch (action.type) {
    case "ADD_RESULTS_MESSAGES_TO_ORDER":
      const { messages } = action;
      const { id, timeStamp } = action.currentOrder;
      return [
        ...state,
        {
          id,
          timeStamp,
          messages
        }
      ];

    default:
      return state;
  }
};

export const recordHourlyTimestampReducer = (
  state = ["Pre-CRRT 1", "Pre-CRRT 2"],
  action
) => {
  switch (action.type) {
    case "RECORD_HOURLY_TIMESTAMP":
      if (action.timeStamps.length) {
        return [...state, ...action.timeStamps];
      } else {
        return ["Pre-CRRT 1", "Pre-CRRT 2"]
      }
    default:
      return state;
  }
};
