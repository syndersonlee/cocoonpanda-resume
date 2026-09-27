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

import {
  education,
  activities,
  awards,
  awardsYear,
} from "data/profile.js";

class Experience extends React.Component {
  render() {
    return (
      <>
        <div id="exp-cmp" className="container">
          <h3 className="h3 text-danger font-weight-bold mt-lg mb-4">
            Education & Activity
          </h3>
          <Row>
            <Col lg="6" className="mb-4">
              <h6 className="text-uppercase font-weight-bold">Education</h6>
              <ul className="pl-3">
                {education.map((entry) => (
                  <li key={entry.title}>
                    {entry.title}{" "}
                    <span className="text-muted small">({entry.period})</span>
                  </li>
                ))}
              </ul>
              <h6 className="text-uppercase font-weight-bold mt-4">Awards</h6>
              <ul className="pl-3">
                {awards.map((award) => (
                  <li key={award}>
                    {award}{" "}
                    <span className="text-muted small">({awardsYear})</span>
                  </li>
                ))}
              </ul>
            </Col>
            <Col lg="6" className="mb-4">
              <h6 className="text-uppercase font-weight-bold">Activity</h6>
              <ul className="pl-3">
                {activities.map((entry) => (
                  <li key={entry.title}>
                    {entry.title}{" "}
                    <span className="text-muted small">({entry.period})</span>
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Experience;
