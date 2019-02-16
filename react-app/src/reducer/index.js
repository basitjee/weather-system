let datas = {
  skills: [],
  form: {
    skill: "",
    experience: ""
  },
  error: {
    active: true,
    class: "",
    msg: ""
  }
};

const reducer = (state = datas, action) => {
  let newstate;
  switch (action.type) {
    // update the skills from api
    case "updateskills":
      newstate = {};
      newstate = {
        ...state,
        skills: action.skills
      };
      state = newstate;
      break;

    // change the form skill field value
    case "skillValueChange":
      newstate = {};
      newstate = {
        ...state,
        form: { ...state.form, skill: action.formSkills }
      };
      state = newstate;
      break;

    // change the form experience field value
    case "experienceValueChange":
      newstate = {};
      newstate = {
        ...state,
        form: { ...state.form, experience: action.formExperience }
      };
      state = newstate;
      break;

    // Update the error msg and it's class
    case "updateError":
      newstate = {};
      newstate = {
        ...state,
        error: {
          ...state.error,
          active: action.active,
          msg: action.msg,
          class: action.class
        }
      };
      state = newstate;
      break;
    default:
      break;
  }

  return state;
};
export default reducer;
