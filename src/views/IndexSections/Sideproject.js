/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import { Row, Col } from "reactstrap";

import { sideProjects } from "data/profile.js";

class Sideproject extends React.Component {
  render() {
    return (
      <>
        <div id="sideproject-cmp" className="container">
          <h2 className="h3 text-warning font-weight-bold mt-lg mb-2">
            Side Projects
          </h2>
          <p className="text-muted small mb-5">
            대학 시절 동아리·해커톤에서 서버 개발을 맡았던 프로젝트입니다.
          </p>
          <Row>
            {sideProjects.map((project) => (
              <Col key={project.name} className="mb-5" sm="3" xs="6">
                <p className="d-block text-uppercase font-weight-bold mb-2">
                  {project.name}
                </p>
                <p className="small">{project.description}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    alt={project.name}
                    className="mt-2 img-fluid rounded shadow"
                    src={require(`images/${project.image}`)}
                    style={{ width: "150px" }}
                  />
                </a>
              </Col>
            ))}
          </Row>
          <p className="small">
            <a
              href={require("images/letstouch_final.mp4")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Lets-Touch 시연영상 보기
            </a>
          </p>
        </div>
      </>
    );
  }
}

export default Sideproject;
