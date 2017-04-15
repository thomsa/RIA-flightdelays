export function getErrorDataFromActions(store) {
  const finalActions = store.getActions();
  const tempData = finalActions[1].error.data;
  finalActions[1].error = {data: tempData};
  return finalActions;
}
