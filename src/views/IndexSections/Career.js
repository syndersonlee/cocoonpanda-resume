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
import { Row, Col, Badge, Button, Collapse, Table } from "reactstrap";

import careers from "data/careers.js";
import deepDives from "data/deepDives.js";

class Career extends React.Component {
  state = { open: {} };

  toggle = (title) => {
    this.setState((prev) => ({
      open: { ...prev.open, [title]: !prev.open[title] },
    }));
  };

  renderDeepDive(sections) {
    return sections.map((section) => (
      <div key={section.title} className="mb-4">
        <h6 className="font-weight-bold mb-2">{section.title}</h6>
        {section.paragraphs &&
          section.paragraphs.map((text) => (
            <p key={text} className="small mb-2">
              {text}
            </p>
          ))}
        {section.ordered && (
          <ol className="small pl-3 mb-2">
            {section.ordered.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ol>
        )}
        {section.bullets && (
          <ul className="small pl-3 mb-2">
            {section.bullets.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
        )}
        {section.table && (
          <Table size="sm" bordered responsive className="small mb-2">
            <thead className="thead-light">
              <tr>
                {section.table.head.map((cell) => (
                  <th key={cell}>{cell}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row) => (
                <tr key={row.join("|")}>
                  {row.map((cell, index) => (
                    <td key={index}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        {section.note && (
          <p className="small text-muted border-left border-primary pl-2 mb-0">
            {section.note}
          </p>
        )}
      </div>
    ));
  }

  render() {
    return (
      <>
        <div id="career-cmp" className="container">
          <h3 className="h3 text-primary font-weight-bold mt-md">
            Work Experience
          </h3>
          {careers.map((career) => (
            <Row key={career.company} className="py-4 border-bottom">
              <Col lg="3" className="mb-3">
                <h5 className="font-weight-bold mb-1">{career.company}</h5>
                <p className="text-primary font-weight-bold mb-1">
                  {career.period}
                </p>
                <p className="text-muted mb-2">{career.team}</p>
                <div>
                  {career.stack.map((tech) => (
                    <Badge
                      key={tech}
                      color="secondary"
                      className="mr-1 mb-1 text-dark"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Col>
              <Col lg="9">
                {career.projects.map((project) => (
                  <div key={project.title} className="mb-4">
                    <h6 className="text-primary font-weight-bold mb-1">
                      {project.title}
                    </h6>
                    {project.description && (
                      <p className="text-muted small mb-2">
                        {project.description}
                      </p>
                    )}
                    <ul className="pl-3 mb-0">
                      {project.items.map((item) => (
                        <li key={item.heading} className="mb-2">
                          <span className="font-weight-bold">
                            {item.heading}
                          </span>
                          <ul className="pl-3 small">
                            {item.details.map((detail) => (
                              <li key={detail}>{detail}</li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                    {deepDives[project.title] && (
                      <>
                        <Button
                          color="primary"
                          outline
                          size="sm"
                          className="mt-2"
                          onClick={() => this.toggle(project.title)}
                          aria-expanded={!!this.state.open[project.title]}
                        >
                          {this.state.open[project.title]
                            ? "접기 ▴"
                            : "자세히 보기 ▾"}
                        </Button>
                        <Collapse isOpen={!!this.state.open[project.title]}>
                          <div className="mt-3 p-3 bg-secondary rounded">
                            {this.renderDeepDive(deepDives[project.title])}
                          </div>
                        </Collapse>
                      </>
                    )}
                  </div>
                ))}
              </Col>
            </Row>
          ))}
        </div>
      </>
    );
  }
}

export default Career;
