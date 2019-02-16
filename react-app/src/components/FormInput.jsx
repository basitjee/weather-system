import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

class FormInput extends Component {
  render() {
    return (
      <section>
        <h1>ADD YOUR SKILLS</h1>
        {this.props.state.error.active}
        <div className={`${this.props.state.error.class}`}>
          {this.props.state.error.active && this.props.state.error.msg}
        </div>
        <input
          type="text"
          name="skill"
          placeholder="Node JS, Postgres, React, etc."
          onChange={this.props.skillValueChange}
          value={this.props.state.form.skill}
        />
        <select
          id="experience"
          onChange={this.props.experienceValueChange}
          value={this.props.state.form.experience}
        >
          <option value="">Experience</option>
          <option value="< 1 year">&lt; 1 year</option>
          <option value="3 - 5 years">3 - 5 years</option>
          <option value="5 - 7 years">5 - 7 years</option>
          <option value="7+ years">7+ years</option>
        </select>
        <button
          onClick={() =>
            this.props.addSkill(
              this.props.state.form.skill,
              this.props.state.form.experience
            )
          }
          type="submit"
        >
          Add Skill
        </button>
      </section>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // skill value updateing global state
    skillValueChange: event => {
      dispatch({
        type: "skillValueChange",
        formSkills: event.target.value
      });
    },
    // experience value updateing global state
    experienceValueChange: event => {
      dispatch({
        type: "experienceValueChange",
        formExperience: event.target.value
      });
    },
    // adding skill action
    addSkill: (name, exp) => {
      // Skill name validator
      let msg;
      if (name.length <= 3 || name.length > 255) {
        // if less then 4 char OR more then 255 char Error msg will show
        if (name.length <= 3)
          msg = "Skill Name must be minimum length of 4 characters";
        else msg = "Skill Name must be maximum length of 255 characters!!";

        dispatch({
          type: "updateError",
          active: true,
          msg: msg,
          class: "alert-box"
        });
        return false;
      } else {
        dispatch({
          type: "updateError",
          active: false,
          msg: "",
          class: ""
        });
      }

      //Skill Experience time validator
      if (exp.trim().length === 0) {
        dispatch({
          type: "updateError",
          active: true,
          msg: "Please Select Experience!!",
          class: "alert-box"
        });
        return false;
      } else {
        dispatch({
          type: "updateError",
          active: false,
          msg: "",
          class: ""
        });
      }

      let data = {
        name: name,
        expirience: exp
      };
      axios.post("http://localhost:3000/skills", data).then(() => {
        axios.get("http://localhost:3000/skills").then(res => {
          // update the new skills
          dispatch({
            type: "updateskills",
            skills: res.data
          });
          // empty the skill field value
          dispatch({
            type: "skillValueChange",
            formSkills: ""
          });
          // empty the experience field value
          dispatch({
            type: "experienceValueChange",
            formExperience: ""
          });
        });
      });
    }
  };
}
function mapStateToProps(state) {
  return {
    state: state
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormInput);
