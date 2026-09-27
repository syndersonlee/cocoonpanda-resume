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
import { Button, Container, Row, Col } from "reactstrap";

import { skills } from "data/profile.js";

const colors = ["primary", "info", "success", "warning"];

class Skill extends React.Component {
  render() {
    return (
      <>
        <section
          className="section section-components pb-0 mb-8"
          id="section-components"
        >
          <Container>
            <h2 className="h3 text-success font-weight-bold mb-3">
              <span>Core Skills</span>
            </h2>
            <Row>
              {skills.map((skill, index) => (
                <Col key={skill.category} lg="6">
                  <div className="mb-3 mt-5">
                    <h5 className="text-uppercase font-weight-bold">
                      {skill.category}
                    </h5>
                  </div>
                  <div className="skill-set">
                    {skill.items.map((item) => (
                      <Button
                        key={item}
                        className="btn-1 mb-2"
                        color={colors[index % colors.length]}
                        outline
                        size="sm"
                        type="button"
                      >
                        {item}
                      </Button>
                    ))}
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      </>
    );
  }
}

export default Skill;
