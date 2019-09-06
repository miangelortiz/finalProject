import React from "react";
import "./Brainstorming.css";
import { IBrain, IBsIdea } from "../../interfaces/brainInterface";
import { IGlobalState } from "../../reducers/reducers";
import { connect } from "react-redux";
import AddBsIdea from "./AddBsIdea";
import { IMyUser } from "../../interfaces/userInterfaces";
import * as actions from "../../actions/actions";

const { Button, Modal, Icon } = require("react-materialize");

interface IPropsGlobal {
  token: string;
  myUser: IMyUser;
  brainTitle: IBrain[];
  bsIdeas: IBsIdea[];
  updateBSvotes: (bsIdea_id: string, bsIdea: IBsIdea) => void;
}

const Brainstorming: React.FC<IPropsGlobal> = props => {
  //I get the current published project in the first position of the array
  const currentTitle = props.brainTitle.sort(
    (b1, b2) => new Date(b2.created).valueOf() - new Date(b1.created).valueOf()
  );

  const brainIdeas = props.bsIdeas.filter(
    bi => bi.brain._id === currentTitle[0]._id
  );

  if (!currentTitle) {
    return null;
  }

  //Add or remove votes from brainstorming idea
  const updateBSvotes = (bsIdea_id: string, bsIdea: IBsIdea) => {
    const userId = props.myUser.id;
    if (!userId) {
      return null;
    }
    const voted = bsIdea.votes.find(i => i === userId);
    if (bsIdea.user._id === userId) {
      return console.log("no puedes votarte a ti mismo");
    }
    if (voted) {
      const removeBsVote = bsIdea.votes;
      const index = bsIdea.votes.findIndex(bsv => bsv === userId);
      removeBsVote.splice(index, 1);
      var bsVotes = [...removeBsVote];
    } else {
      const newBsvote = bsIdea.votes;
      newBsvote.push(userId);
      bsVotes = [...newBsvote];
    }
    fetch("http://localhost:3000/api/brainstorming/votes/" + bsIdea._id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + props.token
      },
      body: JSON.stringify({
        votes: bsVotes
      })
    }).then(resp => {
      if (resp.ok) {
        resp.json().then((bs: IBsIdea) => {
          props.updateBSvotes(bsIdea_id, bs);
        });
      }
    });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col s12 brainTitle">
            <Modal
              header="[ el proyecto de la semana ]"
              className="modalShow"
              options={{ dismissible: false }}
              trigger={
                <Button
                  className="orange lighten-2"
                  waves="light"
                  icon="info_outline"
                  floating
                  tooltip="Info"
                  tooltipOptions={{ position: "left" }}
                />
              }
            >
              <hr />
              <span className="spanInfoBrain">
                Cada semana publicaremos una idea o proyecto para que todos
                hagamos un BRAINSTORMING. Se eligirán las 4 ideas más votadas,
                que pasarán a formar parte del proyecto. ¡Anímate y pon la tuya!{" "}
              </span>
            </Modal>{" "}
            {brainIdeas.findIndex(i => i.user._id === props.myUser.id) ===
              -1 && (
              <Modal
                header="[ idea para el proyecto de la semana ]"
                className="modalShow"
                options={{ dismissible: false }}
                trigger={
                  <Button
                    className="pulse"
                    floating
                    waves="light"
                    icon="lightbulb_outline"
                    tooltip="¡Aporta tu idea!"
                    tooltipOptions={{ position: "right" }}
                  />
                }
              >
                <div>
                  <AddBsIdea brainId={currentTitle[0]._id} />
                </div>
              </Modal>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col s12 brainTitle">{currentTitle[0].title}</div>
        </div>
        <div className="row ulPosit">
          <ul>
            {brainIdeas.length === 0 && <p>No hay ideas!</p>}
            {brainIdeas.length > 0 && (
              <>
                {brainIdeas.map(bsi => (
                  <div className="col s2 liPosit" key={bsi._id}>
                    <li>
                      <a className="aPosit">
                        <div className="row">
                          <div className="col s12 pPosit">{bsi.content}</div>
                        </div>
                        <div className="row">
                          <div className="col s8">
                            por
                            <span className="spanPosit"> {bsi.user.name} </span>
                          </div>
                          <div className="col s2">
                            <Button
                              className="transparent "
                              floating
                              waves="light"
                              small
                              onClick={() => updateBSvotes(bsi._id, bsi)}
                              tooltip="¡Me gusta!"
                            >
                              <span className="spanPVotes2">
                                {bsi.votes.length}
                              </span>
                            </Button>
                          </div>
                          <div className="col s2 spanPVotes">
                            {bsi.votes.find(v => v === props.myUser.id) && (
                              <span>
                                <Icon  tiny>thumb_up</Icon>
                              </span>
                            )}
                          </div>
                        </div>
                      </a>
                    </li>
                  </div>
                ))}
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  token: state.token,
  myUser: state.myUser,
  brainTitle: state.brainTitle,
  bsIdeas: state.bsIdeas
});
const mapDispatchToProps = {
  updateBSvotes: actions.updateBSvotes
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Brainstorming);
