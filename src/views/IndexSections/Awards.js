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
// nodejs library that concatenates classes
// reactstrap components
import {
  Button,
  Modal,
  Row,
  Col
} from "reactstrap";

class Awards extends React.Component {
  state = {};
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };
  render() {
    return (
      <>
        <br/><br/>
        <h3 className="h3 text-warning font-weight-bold mb-4">Award</h3>
        <div class="small float-right" >버튼 클릭시 상세 페이지를 확인 가능합니다</div>
        <Row>
          <Col md="4">
            <Button
              block
              className="mb-3"
              color="primary"
              type="button"
              onClick={() => this.toggleModal("defaultModal")}
            >
              NH챌린지해커톤 - 장려상
            </Button>
            <Modal
              className="modal-dialog-centered"
              isOpen={this.state.defaultModal}
              toggle={() => this.toggleModal("defaultModal")}
            >
              <div className="modal-header">
                <h6 className="modal-title" id="modal-title-default">
                NH챌린지해커톤
                </h6>
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => this.toggleModal("defaultModal")}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <div className="modal-body">
                <img alt="nhhack" src=" https://eventusstorage.blob.core.windows.net/evs/Image/nhhackathon/9347/ProjectInfo/Cover/8cd018fc72b94b8185d43dfe2e695be3.jpg" width="250px"></img>
                <br/><br/>
                <p>
                2019.09
                </p>
                <p>
                NH농협은행에서 개최한 '범농협 계열사 연계 서비스 기획 및 개발'을 위한 "NH디지털혁신캠퍼스 챌린지 해커톤"에서 농수산물 확인 원산지 파악 가능 카페 사이렌오더 어플리케이션 '올라'의 서버로 참여하여 장려상을 수상하였습니다.
                </p>
              </div>
              <div className="modal-footer">
                <Button
                  className="ml-auto"
                  color="link"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => this.toggleModal("defaultModal")}
                >
                  Close
                </Button>
              </div>
            </Modal>
          </Col>
          <Col md="4">
            <Button
              block
              className="mb-3"
              color="danger"
              type="button"
              onClick={() => this.toggleModal("notificationModal")}
            >
              Inchon Civic Hack - 장려상
            </Button>
            <Modal
              className="modal-dialog-centered"
              isOpen={this.state.notificationModal}
              toggle={() => this.toggleModal("notificationModal")}
            >
              <div className="modal-header">
                <h6 className="modal-title" id="modal-title-notification">
                  Inchon Civic Hack 
                </h6>
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => this.toggleModal("notificationModal")}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <div className="modal-body">
                <img alt="incheonhack" src="https://www.incheon.go.kr/data/editor/20190828/20190828183705.jpg" width="250px"></img>
                <br/><br/>
                <p>
                  2019.11
                  </p>
                <p>
                  인천대학교 창업다락에서 인천 도시문제 해결 공공플랫폼 개발대회 인 「2019 인천 시빅 핵페어(2019 Incheon Civic Hack-Fair)」에서 2개월 동안 스마트도시 공공플랫폼을 솝파이트팀으로 참가하여 최종작품을 완성했습니다.
                  영상크리에이터를 돕는 장소를 소개, 예약을 돕는 플랫폼 LocAin을 출품해 장려상을 수상하였습니다.
                </p>
              </div>
              <div className="modal-footer">
                <Button
                  className="ml-auto"
                  color="link"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => this.toggleModal("notificationModal")}
                >
                  Close
                </Button>
              </div>
            </Modal>
          </Col>
        </Row>
      </>
    );
  }
}

export default Awards;
