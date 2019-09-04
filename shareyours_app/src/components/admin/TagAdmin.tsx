import React from "react";
import { ITag } from "../../interfaces/tagInterface";
import { IGlobalState } from "../../reducers/reducers";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions/actions";

const { Select, Button, TextInput, Badge } = require("react-materialize");

interface IPropsGlobal {
  token: string;
  tags: ITag[];
  addTag: (tag: ITag) => void;
}

const TagAdmin: React.FC<IPropsGlobal> = props => {
  const [tags, setTagsValue] = React.useState<string[]>([]);
  const [nameValue, setNameValue] = React.useState<string>("");
  const [msg, setMsg] = React.useState<string>("");
  const [msg2, setMsg2] = React.useState<string>("");

  const tagsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const options = event.currentTarget.options;
    const selectedOptions = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedOptions.push(options[i].value);
      }
    }
    setTagsValue(selectedOptions);
  };
  const nameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(event.currentTarget.value);
    setMsg("");
    setMsg2("");
  };

  //Delete selected TAG (only one!)
  const deleteTag = (idTag: string) => {
    fetch("http://localhost:3000/api/admin/tags/" + idTag, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + props.token
      }
    }).then(resp => {
      if (resp.ok) {
        setMsg2("Categoria " + nameValue + " eliminada");
      }
    });
  };

  //Add Tag
  const addTag = () => {
    fetch("http://localhost:3000/api/admin/tags", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + props.token
      },
      body: JSON.stringify({
        name: nameValue
      })
    }).then(resp => {
      if (resp.ok) {
        resp.json().then((tag: ITag) => {
          props.addTag(tag);
          setMsg("Categoría " + nameValue + " añadida");
        });
      } else {
        setMsg("Ya existe la categoría " + nameValue);
      }
    });
  };

  return (
    <>
      <div className="container">
        <div className="row adminTitle">[ categorías ]</div>
        <div className="row">
          <div className="col s4 offset-s4 ">
            <div className="card-panel ">
              <div className="row">
                <div className="col s12">
                  <Select
                    multiple
                    onChange={tagsChange}
                    noLayout
                    options={{ dropDownOptions: { closeOnClick: false } }}
                  >
                    <option value="" disabled>
                      Elige categoría a eliminar
                    </option>
                    {props.tags.sort().map(t => (
                      <option key={t._id} value={t._id}>
                        {t.name}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="row">
                <div className="col s2">
                  <Button
                    className="teal lighten-2"
                    floating
                    node="a"
                    waves="light"
                    small
                    icon="check"
                    tooltip="Actualizar"
                    tooltipOptions={{ position: "right" }}
                    onClick={() => deleteTag(tags[0])}
                  />
                </div>
                <Badge className="red-text">{msg2}</Badge>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col s4 offset-s4 ">
              <div className="card-panel ">
                <div className="row">
                  <div className="col s12">
                    <TextInput
                      noLayout
                      text
                      validate
                      label="Añade una categoría"
                      value={nameValue}
                      onChange={nameChange}
                    />
                  </div>
                  <div className="col s10"></div>
                </div>

                <div className="row">
                  <div className="col s2">
                    <Button
                      className="teal lighten-2"
                      floating
                      waves="light"
                      small
                      icon="check"
                      tooltip="Añadir categoría"
                      tooltipOptions={{ position: "right" }}
                      onClick={addTag}
                    />
                  </div>
                  <div className="col s10">
                    <Badge className="teal-text">{msg}</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row adminTitle">
          <Link to={"/admin"}>
            <span className="showDuser"> panel de administrador </span>
          </Link>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  token: state.token,
  tags: state.tags
});
const mapDispatchToProps = {
  addTag: actions.addTag
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagAdmin);
