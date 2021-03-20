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

class Sideproject extends React.Component {
  render() {
    return (
      <>
        <div id="sideproject-cmp" className="container">
          <div class="small float-right" >이미지 클릭시 깃허브 페이지로 이동합니다</div>
          <h2 className="h3 text-warning font-weight-bold mt-lg mb-5">
            <span>기타 사이드 프로젝트 목록</span>
          </h2>
          <Row>
            <Col sm="3" xs="6">
              <p className="d-block text-uppercase font-weight-bold mb-4">
                Artoo
              </p>
              <p className="small">학생 예술 작가들의 작품 판매 앱</p>
              <a href="https://github.com/soptart/Server">
                <img
                  alt="..."
                  className="mt-3 img-fluid rounded shadow"
                  src={require("images/Artoo.png")}
                  style={{ width: "150px" }}
                />
              </a>
            </Col>
            <Col sm="3" xs="6">
              <p className="d-block text-uppercase font-weight-bold mb-4">
                LocAin
              </p>
              <p className="small">인천시 유휴 공간 대여 앱</p>
              <a href="https://github.com/syndersonLEE/LocAinServer">
                <img
                  alt="..."
                  className="mt-3 img-fluid rounded shadow"
                  src={require("images/LocAin.png")}
                  style={{ width: "150px" }}
                />
              </a>
            </Col>
            <Col className="mt-5 mt-sm-0" sm="3" xs="6">
              <p className="d-block text-uppercase font-weight-bold mb-4">
                전하
              </p>
              <p className="small">서울시의 전통체험 / 한옥 예약 앱</p>
              <a href="https://github.com/JeonHa/JeonHa-Server">
                <img
                  alt="..."
                  className="mt-3 img-fluid rounded shadow-lg"
                  src={require("images/jeonha.png")}
                  style={{ width: "150px" }}
                  onMouseOver="this.innerHTML='test'"
                />
              </a>
            </Col>
            <Col className="mt-5 mt-sm-0" sm="3" xs="6">
              <p className="d-block text-uppercase font-weight-bold mb-4">
                올라
              </p>
              <p className="small">NH농협 카페 사이렌오더 / 생산지 추적 앱</p>
              <a href="https://github.com/OrlaProject/Orla_Server">
                <img
                  alt="..."
                  className="mt-3 img-fluid rounded shadow-lg"
                  src={require("images/orla.png")}
                  style={{ width: "150px" }}
                />
              </a>
            </Col>
          </Row>
          <br />
          <br />
          <br />
          <Row>
            <Col className="mt-5 mt-sm-0" sm="3" xs="6">
              <p className="d-block text-uppercase font-weight-bold mb-4">
                쉬자
              </p>
              <p className="small">취준생을 위한 정보 제공 앱</p>
              <a href="https://github.com/soptrest/soptgetrestserver">
                <img
                  alt="..."
                  className="mt-3 img-fluid rounded-circle shadow-lg"
                  src={require("images/get-rest.png")}
                  style={{ width: "150px" }}
                  onMouseOver="this.innerHTML='test'"
                />
              </a>
            </Col>
            <Col sm="3" xs="6">
              <p className="d-block text-uppercase font-weight-bold mb-4">
                짤내투어
              </p>
              <p className="small">간단하게 만드는 우리만의 짤 생성기 앱</p>
              <a href="https://github.com/amathon-2019/GodokChatting">
                <img
                  alt="..."
                  className="mt-3 img-fluid rounded shadow"
                  src={require("images/zzal.png")}
                  style={{ width: "150px" }}
                />
              </a>
            </Col>
            <Col sm="3" xs="6">
              <p className="d-block text-uppercase font-weight-bold mb-4">
                카툰월드
              </p>
              <p className="small">사용자가 만들어가는 만화 앱</p>
              <a href="https://github.com/kcartoonworld/kcartoonserver">
                <img
                  alt="..."
                  className="mt-3 img-fluid rounded shadow"
                  src={require("images/cartoon.png")}
                  style={{ width: "150px" }}
                />
              </a>
            </Col>
            <Col sm="3" xs="6">
              <p className="d-block text-uppercase font-weight-bold mb-4">
                Lets-Touch
              </p>
              <p className="small">
                손 마디 압력 센서, 밴딩 센서 및 가속도 센서를 이용한 장갑
                디바이스
              </p>
              <a href="https://github.com/syndersonLEE/LetsTouch">
                <img
                  alt="..."
                  className="img-fluid rounded shadow"
                  src={require("images/letstouch.png")}
                  style={{ width: "150px" }}
                />
              </a>
            </Col>
          </Row>
          <div className="py-3 align-items-center">
            <p className="font-weight-bold">LetsTouch 시연영상</p>
            <div>
              <video
                className="embVideo"
                src={require("images/letstouch_final.mp4")}
                muted
                autoplay
                controls
              >
                No support video in browser
              </video>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Sideproject;
