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
import { Container, Row, Col } from "reactstrap";

import profile from "data/profile.js";

class TopSection extends React.Component {
  render() {
    return (
      <>
        <div className="position-relative">
          {/* Hero for FREE version */}
          <section className="section section-hero section-shaped">
            {/* Background circles */}
            <div className="shape shape-style-1 shape-default">
              <span className="span-150" />
              <span className="span-50" />
              <span className="span-50" />
              <span className="span-75" />
              <span className="span-100" />
              <span className="span-75" />
              <span className="span-50" />
              <span className="span-100" />
              <span className="span-50" />
              <span className="span-100" />
            </div>
            <Container className="shape-container d-flex align-items-center py-lg">
              <div className="col px-0">
                <Row className="align-items-center justify-content-center">
                  <Col className="text-center" lg="9">
                    <div className="mt-5">
                      <p className="display-2 text-white mb-0">
                        {profile.nameKo}{" "}
                        <small className="text-white-50">{profile.nameEn}</small>
                      </p>
                      <p className="h4 text-white font-weight-bold mb-4">
                        {profile.role}
                      </p>
                    </div>
                    <p className="lead text-white">{profile.summary}</p>
                    <div className="mt-4">
                      <a
                        className="btn btn-white btn-icon mb-2 mr-2"
                        href={`mailto:${profile.email}`}
                        style={{ textTransform: "none" }}
                      >
                        <i className="fa fa-envelope mr-2" />
                        {profile.email}
                      </a>
                      <a
                        className="btn btn-outline-white btn-icon mb-2"
                        href={profile.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fa fa-github mr-2" />
                        GitHub
                      </a>
                    </div>
                  </Col>
                </Row>
              </div>
            </Container>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew zindex-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
        </div>
      </>
    );
  }
}

export default TopSection;
