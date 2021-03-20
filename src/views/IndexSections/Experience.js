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

class Experience extends React.Component {
  render() {
    return (
      <>
        <div id="exp-cmp" className="container">
          <h3 className="h3 text-primary font-weight-bold mt-md">
            Work Experience
          </h3>
          <Row className="py-3 align-items-center">
            <Col className="mb-5" sm="3">
              <a href="https://www.hyundai-autoever.com/">
                <img
                  className="img-fluid"
                  alt="autoever"
                  src="https://www.hyundai.co.kr/images/affiliates/others/img-autoever-logo.gif"
                  width="150px"
                ></img>
              </a>
            </Col>
            <Col sm="9">
              <h5>현대오토에버 경영데이터분석팀</h5>
              <p>2020.03 – 2021.02</p>
              <li>
                현대/기아 해외 판매 법인 데이터 관리 / 경영층, 실무자 대상 경영레포트 대시보드 개발 - JSP / Spring
              </li>
              <li>
                Oracle / Tibero Database 데이터와 현지 database 간의 데이터 무결성을 유지
              </li>
              <li> 
                본사의 요청에 따른 데이터 / 로직 / 대시보드 화면 변경 작업을 Informatica / SAP 솔루션 및 DDL, DML을 쿼리 주입을 통해 진행
              </li>
              <br></br>
              SKILLS : JSP(전자정부프레임워크) / Oracle, Tibero / SAP BW / Informatica PowerCenter
            </Col>
          </Row>

          <br />

          <Row className="py-3 align-items-center">
            <Col className="mb-5" sm="3">
              <a href="https://concat.kr/">
                <img
                  className="img-fluid"
                  alt="concat"
                  src="https://concat.kr/images/concat-black-logo.png"
                  width="150px"
                ></img>
              </a>
            </Col>
            <Col sm="9">
              <h5>CONCAT INC. React Native 개발 인턴</h5>
              <p>2018.12 – 2019.06</p>
              <li>
                미세먼지 데이터 제공 및 상품 판매 플랫폼 어플리케이션에 들어가는
                View를 React Native로 개발 어플리케이션으로 개발
              </li>
              <li>
                GCP의 Cloud Function / Node.js를 활용하여 Serverless로
                크롤링으로 DB에 저장하는 API를 개발
              </li>
              <br></br>
              SKILLS : React Native / React Native Router / JSX / Node.js / Google Cloud Function
            </Col>
          </Row>
          <br />
          <Row className="py-3 align-items-center">
            <Col className="mb-5" sm="3">
              <a href="https://neuroacs.com/">
                <img
                  className="img-fluid"
                  alt="neuroacs"
                  src="https://neuroacs.com/img/logo_neuro_big.png"
                  width="150px"
                ></img>
              </a>
            </Col>
            <Col sm="9">
              <h5>㈜Neuro Associates 웹 개발 인턴</h5>
              <p>2018.06 – 2018.08</p>
              <li>
                D3.js / Billboard.js / Toast.UI / Chart.js 등의 차트
                라이브러리를 사용해서 클라이언트가 요구한 샘플을 작성{" "}
              </li>
              <li>
                차트의 로딩 속도 및 각 라이브러리로 만들 수 있는 차트를 분석한
                보고서 제작
              </li>
              <br></br>
              SKILLS : Javascript / Typescript / D3.js / Billboard.js
            </Col>
          </Row>
          <h3 className="h3 text-danger font-weight-bold mt-md">Experience</h3>
          <Row className="py-3 align-items-center">
            <Col className="mb-5" sm="3">
              <a href="http://sopt.org">
                <img
                  className="img-fluid"
                  alt="sopt"
                  src={require("images/sopt.png")}
                  width="150px"
                ></img>
              </a>
            </Col>
            <Col sm="9">
              <h5>대학생 연합 IT벤처 창업 동아리 S.O.P.T</h5>
              <p>2018.09 ~ 2019.08</p>
              <li>
                23기 서버 파트 - (AppJam Project - <b>Artoo</b>)
                <ul>
                  <li>상품 주문 관리 시스템 개발</li>
                  <li>판매 상품 CRUD 개발</li>
                  <li>Spring Boot / AWS EC2, RDS, S3</li>
                </ul>
              </li>
              <li>
                24기 서버 파트 - (AppJam Project - <b>쉬자</b>)
                <ul>
                  <li>사람인 채용 공고 데이터 크롤링 개발</li>
                  <li>JWT 인증 페이지 / 메인 페이지 / 채용 공고 페이지 CRUD 개발</li>
                  <li>Express.js / AWS EC2, RDS, S3, Lambda</li>
                </ul>
              </li>
              <li>
                25기 비활동 프로젝트 참여 - (AppJam Project - <b>뭐라하지</b>)
                <ul>
                  <li>채팅 서비스 개발 / 소개팅 매칭 배치 알고리즘 개발</li>
                  <li>Express.js / AWS EC2, RDS, S3, Lambda / Google Firestore</li>
                </ul>
              </li>
            </Col>
          </Row>
          <Row className="py-3 align-items-center">
            <Col className="mb-5" sm="3">
              <a href="https://swmaestro.org/">
                <img
                  className="img-fluid"
                  alt="swm"
                  src="https://swmaestro.org/static/sw/images/logo_copy.png"
                  width="150px"
                ></img>
              </a>
            </Col>
            <Col sm="9">
              <h5> 10기 SW마에스트로 과정</h5>
              <p>2019.06 ~ 2019.11 </p>
              <li>Team greyGlass</li>
              <li>
                장갑형 센서 플랫폼 <b>LetsTouch</b> Software 개발 - Unity / C#
              </li>
              <li>압력/밴딩/가속도 센서를 통해 확인할 수 있는 수치를 시각화하여 Unity 객체로 매핑하여 시각화</li> 
            </Col>
          </Row>
          <br></br>
          <Row className="py-3 align-items-center">
            <Col className="mb-5" sm="3">
              <a href="https://neuroacs.com/">
                <img
                  className="img-fluid"
                  alt="nexters"
                  src={require("images/nexters.png")}
                  width="120px"
                ></img>
              </a>
            </Col>
            <Col sm="9">
              <h5>개발자와 디자이너를 위한 IT 연합동아리 Nexters</h5>
              <p>2020.06 – 2021.02</p>
              <li>
                17기 프로젝트 - <b>뭐라하지</b> (인삿말 소개 서비스)
                (Typescript, Express.js)
              </li>
              <li>18기</li>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Experience;
