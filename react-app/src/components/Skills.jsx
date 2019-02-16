import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
class Skills extends Component {
  componentDidMount() {
    this.props.updateskills();
  }

  renderskills() {
    // if there are no skills in db it will return this
    if (this.props.skills.length === 0)
      return "Please Add Your Awesome Skills!!!";

    let i = 1;
    // Looping through the skills
    return this.props.skills.map(skill => (
      <div className="skill_box" key={skill.id}>
        <div className="skill_box_flex">
          <div className={i > 5 ? "no1" : "no"}>{i++}</div>
          <div className="skill_info">
            <div>{skill.name}</div>
            <div>{skill.expirience}</div>
          </div>
          <div
            className="close"
            onClick={() => this.props.deleteSkill(skill.id)}
          >
            &#10006;
          </div>
        </div>
      </div>
    ));
  }
  render() {
    return (
      <section>
        <div className="skill_set">{this.renderskills()}</div>
      </section>
    );
  }
}

function mapDispatchToProps(dispatch) {
  // skill curd operations
  return {
    deleteSkill: d => {
      axios.delete("http://localhost:3000/skills/" + d).then(() => {
        axios.get("http://localhost:3000/skills").then(res => {
          dispatch({
            type: "updateskills",
            skills: res.data
          });
        });
      });
    },
    updateskills: () => {
      axios.get("http://localhost:3000/skills").then(res => {
        dispatch({
          type: "updateskills",
          skills: res.data
        });
      });
    }
  };
}

function mapStateToProps(state) {
  return {
    skills: state.skills
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Skills);
