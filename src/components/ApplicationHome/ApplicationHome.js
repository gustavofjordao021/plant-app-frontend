import React, { Component } from "react";

import { Redirect } from "react-router-dom";
import { AuthContext } from "../../context/index";

import MainNav from "../Navbar/MainNav/MainNav";
import UserProfile from "../UserProfile/UserProfile";
import NewCollection from "../NewCollection/NewCollection";
import CollectionBlock from "../CollectionBlock/CollectionBlock";
import CollectionDetails from "../CollectionDetails/CollectionDetails";

import "./ApplicationHome.css";

import { Row, Col, Card, Button, CardDeck } from "reactstrap";

class ApplicationHome extends Component {
  state = {
    isUserProfileVisible: this.props.visibleUserProfile,
    // isNewPlantFormVisible: false,
    isCollectionDetailsVisible: this.props.visibleUserProfile,
    isNewCollectionFormVisible: false,
  };

  // toggleNewPlantFormOn = () => {
  //   this.setState((prevState) => ({
  //     ...prevState,
  //     isNewPlantFormVisible: true,
  //   }));
  // };

  // toggleNewPlantFormOff = () => {
  //   this.setState((prevState) => ({
  //     ...prevState,
  //     isNewPlantFormVisible: false,
  //   }));
  // };

  toggleCollectionDetailsOn = () => {
    this.setState((prevState) => ({
      ...prevState,
      isCollectionDetailsVisible: true,
    }));
  };

  toggleCollectionDetailsOff = () => {
    this.setState((prevState) => ({
      ...prevState,
      isCollectionDetailsVisible: false,
    }));
  };

  toggleNewCollectionFormOn = () => {
    this.setState((prevState) => ({
      ...prevState,
      isNewCollectionFormVisible: true,
    }));
  };

  toggleNewCollectionFormOff = () => {
    this.setState((prevState) => ({
      ...prevState,
      isNewCollectionFormVisible: false,
    }));
  };

  toggleUserProfileOn = () => {
    this.setState((prevState) => ({
      ...prevState,
      isUserProfileVisible: true,
    }));
  };

  toggleUserProfileOff = () => {
    this.setState((prevState) => ({
      ...prevState,
      isUserProfileVisible: false,
    }));
  };

  render() {
    const { isUserProfileVisible, isCollectionDetailsVisible } = this.state;
    return (
      <AuthContext.Consumer>
        {(context) => {
          const { currentUser, isLoggedIn } = context.state;
          return (
            <>
              {!isLoggedIn ? (
                <Redirect to="/login" />
              ) : (
                <>
                  <Row className="flex-center full-height">
                    <MainNav
                      userLoggedIn={currentUser}
                      passedDownToggleNewCollectionForm={
                        this.toggleNewCollectionFormOn
                      }
                      passedDownToggleUserProfileOn={this.toggleUserProfileOn}
                      passedDownToggleUserProfileOff={this.toggleUserProfileOff}
                      passedDownToggleCollectionDetailsOn={
                        this.toggleCollectionDetailsOn
                      }
                      passedDownToggleCollectionDetailsOff={
                        this.toggleCollectionDetailsOff
                      }
                    />
                    <Col className="p-0 flex-container main-container full-height full-width">
                      {isUserProfileVisible && !isCollectionDetailsVisible ? (
                        <UserProfile />
                      ) : !isUserProfileVisible &&
                        isCollectionDetailsVisible ? (
                        <CollectionDetails />
                      ) : (
                        <Card
                          className="full-height full-width flex-container main-container bg-secondary"
                          id="card-container"
                        >
                          {this.state.isNewCollectionFormVisible ? (
                            <CardDeck className="flex-center full-width full-height">
                              <NewCollection
                                isOpen={this.state.isNewCollectionFormVisible}
                                isDone={this.toggleNewCollectionFormOff}
                              />
                            </CardDeck>
                          ) : currentUser.collections.length > 0 ? (
                            currentUser.collections.map((collection, id) => (
                              <CollectionBlock
                                collectionId={collection._id}
                                collectionName={collection.collectionName}
                                collectionDescription={
                                  collection.collectionDescription
                                }
                                collectionPlants={collection.collectionPlants}
                                passedDownToggleCollectionDetailsOn={
                                  this.toggleCollectionDetailsOn
                                }
                                passedDownToggleCollectionDetailsOff={
                                  this.toggleCollectionDetailsOff
                                }
                              />
                            ))
                          ) : (
                            <CardDeck className="flex-center full-width full-height">
                              <span className="text-center m-4">
                                <p className="text-muted card-text">
                                  Select a collection on the left, or click
                                  below to create a new collection
                                </p>
                                <Button
                                  id="secondary-goal-add"
                                  color="secondary"
                                  className="align-items-center title secondary-cta"
                                  onClick={() =>
                                    this.toggleNewCollectionFormOn()
                                  }
                                >
                                  <i className="ni ni-fat-add"></i>
                                  <span className="secondary-cta">
                                    Collection
                                  </span>
                                </Button>
                              </span>
                            </CardDeck>
                          )}
                        </Card>
                      )}
                    </Col>
                  </Row>
                </>
              )}
            </>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}

export default ApplicationHome;
