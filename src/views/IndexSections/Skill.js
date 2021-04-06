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
import PaginItem from "views/IndexSections/PaginItem.js";
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
              <span>SKILLS</span>
            </h2>
            <Row className="justify-content-center">
              <Col lg="6">
                {/* Button styles */}
                <div className="mb-3 mt-5">
                  <h5 className="text-uppercase font-weight-bold">
                    Backend Framework
                  </h5>
                </div>
                <div class="skill-set">
                  <Button className="btn-1" color="primary" type="button">
                    Spring Boot
                  </Button>
                  <PaginItem active="2"></PaginItem>
                  <br />
                  <small>
                    {" "}
                    MyBatis / JPA 및 OAuth2를 활용하여 MVC 기반 API 구축 경험
                  </small>
                  <br />
                  <br />
                  <Button className="btn-1" color="info" type="button">
                    Node.js
                  </Button>
                  <PaginItem active="2"></PaginItem>
                  <br />
                  <small> Express.js을 활용하여 MVC 기반 API 구축 경험</small>
                  <br />
                  <br />
                </div>
              </Col>
              <Col lg="6">
                <div className="mb-3 mt-5">
                  <h5 className="text-uppercase font-weight-bold">Database</h5>
                </div>
                <div class="skill-set">
                  <Button className="btn-1" color="success" type="button">
                    MYSQL
                  </Button>
                  <PaginItem active="2"></PaginItem>
                  <br />
                  <small>CRUD 기반 서비스에 필요한 데이터모델링 및 개발</small>
                  <br />
                  <br />
                  <Button className="btn-1" color="warning" type="button">
                    Oracle DB
                  </Button>
                  <PaginItem active="2"></PaginItem>
                  <br />
                  <small>
                    10만 단위 쿼리 CRUD에 필요한 기본 SQL튜닝 사용 가능
                    (Partition / 힌트 주석)
                  </small>
                  <br />
                  <br />
                </div>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col lg="6">
                <div className="mb-3 mt-5">
                  <h5 className="text-uppercase font-weight-bold">Cloud</h5>
                </div>
                <div class="skill-set">
                  <Button className="btn-1" color="danger" type="button">
                    AWS
                  </Button>
                  <PaginItem active="1"></PaginItem>
                  <br />
                  <small>EC2/RDS/S3/Lambda를 활용한 클라우드 환경 구축</small>
                  <br />
                  <br />
                  <Button className="btn-1" color="primary" type="button">
                    Google Cloud Platform
                  </Button>
                  <PaginItem active="1"></PaginItem>
                  <br />
                  <small>
                    Cloud Function/Firestore 활용한 클라우드 환경 구축
                  </small>
                  <br />
                  <br />
                </div>
              </Col>
              <Col lg="6">
                <div className="mb-3 mt-5">
                  <h5 className="text-uppercase font-weight-bold">
                    Frontend Framework
                  </h5>
                </div>
                <div class="skill-set">
                  <Button className="btn-1" color="success" type="button">
                    React.js
                  </Button>
                  <PaginItem active="1"></PaginItem>
                  <br />
                  <small>JSX를 이용한 뷰 생성</small>
                  <br />
                  <br />
                  <Button className="btn-1" color="warning" type="button">
                    JSP
                  </Button>
                  <PaginItem active="2"></PaginItem>
                  <br />
                  <small>CRUD를 활용한 Servlet 구현 및 화면 개발 가능</small>
                  <br />
                  <br />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
  }
}

export default Skill;
