import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./EventInfoSideBar.module.css";

import { IoIosMore } from "react-icons/io";

import { getJoinedParticipants } from "../../../api/getJoinedParticipants";
import { getUserById } from "../../../api/getUserById";
import { getFullEventById } from "../../../api/getFullEventById";

import ImageSlider from "../../../components/ImageSlider/ImageSlider";
import CloseWindowButton from "../../../components/Buttons/CloseWindowButton/CloseWindowButton";
import ParticipantsList from "./ParticipantsList";

import ParticipantState from "../../../utils/ParticipantState";

import { AnimatePresence, motion } from "framer-motion";
import ParticipantInfoPopUp from "../../../components/PopUp/ParticipantInfoPopUp";
import PrimaryButton from "../../../components/Buttons/PrimaryButton/PrimaryButton";
import OwnerPhotoOverlay from "../../../components/OwnerPhotoOverlay/OwnerPhotoOverlay";
import useAuth from "../../../hooks/useAuth";
import getIdFromToken from "../../../jwt/getIdFromToken";
import { getParticipantState } from "../../../api/getParticipantState";
import { getParticipantByUserId } from "../../../api/getParticipantByUserId";
import { deleteParticipant } from "../../../api/deleteParticipant";
import { createParticipant } from "../../../api/createParticipant";
import { addParticipant } from "../../../api/addParticipant";
import SpotsLeft from "../../../components/Spots/SpotsLeft";
import RequestsList from "./RequestsList";
import { getRequestsByEventId } from "../../../api/getRequestsByEventId";
import RequestsCount from "../../../components/RequestsCount/RequestsCount";

const EventInfoSideBar = ({ ownerId, eventId }) => {
  // States
  const [isShowMore, setIsShowMore] = useState(false);
  const [isOverflowAboutText, setIsOverflowAboutText] = useState(false);
  const [participantsToShow, setParticipantsToShow] = useState([]);
  const [event, setEvent] = useState(null);

  const [owner, setOwner] = useState(null);

  const [hoveredParticipant, setHoveredParticipant] = useState(null);

  const [showAllParticipants, setShowAllParticipants] = useState(false);

  const [showRequests, setShowRequests] = useState(false);

  const [requests, setRequests] = useState(null);

  const [userId, setUserId] = useState(null);

  const [participantState, setParticipantState] = useState(null);

  const [reloadList, setReloadList] = useState(false);

  // Params
  const [searchParams] = useSearchParams();

  // Auth
  const { auth } = useAuth();

  // Navigation
  const navigate = useNavigate();

  // Refs
  const sideBar = useRef(null);
  const showMoreBtn = useRef(null);
  const aboutText = useRef(null);
  // Effects
  useEffect(() => {
    try {
      setUserId(getIdFromToken());
    } catch (e) {
      setUserId(null);
      setParticipantState(null);
      console.log("User is not logged in.");
    }
  }, [auth]);

  useEffect(() => {
    const fetchData = async () => {
      userId &&
        getParticipantState(userId, eventId).then((data) =>
          setParticipantState(data)
        );
    };

    fetchData();
  }, [eventId, userId]);

  useEffect(() => {
    getFullEventById(ownerId, eventId).then((data) => {
      setEvent(data);
    });
  }, [ownerId, eventId, participantState, reloadList]);

  useEffect(() => {
    event &&
      getJoinedParticipants(event.id).then((data) => {
        console.log("Data: ", data);

        setParticipantsToShow(data.slice(0, 5));

        if (
          !showAllParticipants &&
          !showRequests &&
          aboutText.current.scrollHeight > aboutText.current.clientHeight
        ) {
          setIsOverflowAboutText(true);
        } else {
          setIsOverflowAboutText(false);
        }
      });

    return () => setIsShowMore(false);
  }, [event]);

  useEffect(() => {
    console.log("IsShowMore text: ", isOverflowAboutText);
  }, [isOverflowAboutText]);

  useEffect(() => {
    event &&
      getUserById(event.owner_id).then((data) => {
        setOwner(data);
        console.log(
          `Owner photo response: ${data.photo_responses[0].photo_url}`
        );
      });
  }, [event]);

  useEffect(() => {
    const resetSideBar = () => {
      setShowAllParticipants(false);
      setShowRequests(false);
    };
    resetSideBar();
  }, [eventId]);

  useEffect(() => {
    getRequestsByEventId(eventId).then((data) => setRequests(data));
  }, [event]);

  useEffect(() => {
    console.log("Participant state: ", participantState);
  }, [participantState]);

  //TODO Fix opacity when allParticipants is toggled

  // useEffect(() => {
  //   console.log("Show All: ", showAllParticipants);
  //   event &&
  //     (showAllParticipants
  //       ? (sideBar.current.style.opacity = 0)
  //       : (sideBar.current.style.opacity = 1));
  // }, [showAllParticipants, event]);

  // Funcs
  const handleShowAllParticipants = () => {
    setShowAllParticipants(!showAllParticipants);
    setShowRequests(false);
  };

  const handleShowRequests = () => {
    setShowRequests(!showRequests);
    setShowAllParticipants(false);
  };

  const handleShowMore = () => {
    setIsShowMore(!isShowMore);
    showMoreBtn.current.innerHTML = isShowMore ? "Show more" : "Show less";
  };

  const handleCloseWindow = () => {
    navigate({ pathname: "../", search: `?${searchParams.toString()}` });
  };

  const getFormattedDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    return `${month} ${day}`;
  };

  const getFormattedTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <AnimatePresence>
      ( (
      <div>
        {!showAllParticipants && !showRequests && event && (
          <motion.div
            className={styles["side-bar-container"]}
            ref={sideBar}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <div className={styles["header"]}>
              <h2 className={styles["event-title"]}>{event.title}</h2>
              <CloseWindowButton onClick={handleCloseWindow} />
            </div>
            <main>
              {/* Photo */}
              <div className={styles["photo-container"]}>
                <ImageSlider images={event.photo_responses} />
              </div>

              {/* Category */}
              <div className={styles["category-container"]}>
                {event.category_responses.map((category) => (
                  <div key={category.id} className={styles["category"]}>
                    {category.name}
                  </div>
                ))}
              </div>

              {/* Owner */}
              {owner && <OwnerPhotoOverlay owner={owner} />}

              {/* Date */}
              <h3 className={styles["heading"]}>Date and time</h3>
              <div className={styles["date-container"]}>
                <div className={styles["date-range-container"]}>
                  <div className={styles["start-at"]}>
                    <div className={styles["day"]}>
                      {getFormattedDate(event.start_at)}
                    </div>
                    <div className={styles["time"]}>
                      {getFormattedTime(event.start_at)}
                    </div>
                  </div>

                  <div className={styles["expire-at"]}>
                    <div className={styles["day"]}>
                      {getFormattedDate(event.expire_at)}
                    </div>
                    <div className={styles["time"]}>
                      {getFormattedTime(event.expire_at)}
                    </div>
                  </div>
                </div>

                <div className={styles["vl"]}></div>
                <div className={styles["location"]}>{event.location}</div>
              </div>

              {/* Participants */}
              <h3 className={styles["heading"]}>Participants</h3>
              <div className={styles["participant-container"]}>
                <div
                  className={styles["participants-photos"]}
                  onMouseLeave={() => setHoveredParticipant(null)}
                >
                  {participantsToShow.map((participant) => (
                    <div
                      className={styles["item"]}
                      key={participant.id}
                      onMouseEnter={() => {
                        getUserById(participant.user_id).then((data) => {
                          setHoveredParticipant(data);
                        });
                      }}
                    >
                      <img
                        className={styles["participant-img"]}
                        src={participant.participant_photo.photo_url}
                        alt="Participant Img"
                      />
                    </div>
                  ))}
                  <div className={styles["show-more-participants"]}>
                    <button
                      onClick={handleShowAllParticipants}
                      className={styles["show-more-participants-btn"]}
                    >
                      {requests &&
                        userId === ownerId &&
                        requests.length > 0 && (
                          <div className={styles["requests-count-container"]}>
                            <RequestsCount requestsLength={requests.length} />
                          </div>
                        )}
                      <IoIosMore
                        className={styles["show-more-participants-btn-icon"]}
                      />
                    </button>
                  </div>

                  {hoveredParticipant && (
                    <ParticipantInfoPopUp participant={hoveredParticipant} />
                  )}
                </div>
              </div>

              {/* About section */}
              <h3 className={styles["heading"]}>About this event</h3>
              <div className={styles["about-container"]}>
                <div
                  className={
                    styles[isShowMore ? "about-text-full" : "about-text-hidden"]
                  }
                  ref={aboutText}
                >
                  {event.description}
                </div>
                {isOverflowAboutText && (
                  <button
                    onClick={handleShowMore}
                    className={styles["show-more-btn"]}
                    ref={showMoreBtn}
                  >
                    Show more
                  </button>
                )}
              </div>
            </main>

            {/* Lower section */}
            <div className={styles["lower-container"]}>
              <SpotsLeft event={event} />

              {participantState === null && (
                <PrimaryButton
                  className={styles["action-btn"]}
                  onClick={() => navigate("login")}
                >
                  Join
                </PrimaryButton>
              )}

              {participantState === ParticipantState.NONE &&
                userId !== event.owner_id &&
                userId && (
                  <PrimaryButton
                    className={styles["action-btn"]}
                    onClick={() => {
                      createParticipant(userId, eventId).then(() =>
                        setParticipantState(ParticipantState.REQUESTED)
                      );
                    }}
                  >
                    Join
                  </PrimaryButton>
                )}

              {participantState === ParticipantState.REQUESTED &&
                userId !== event.owner_id &&
                userId && (
                  <PrimaryButton
                    className={`${styles["action-btn"]} ${styles["action-2-btn"]}`}
                    onClick={() =>
                      getParticipantByUserId(userId, eventId).then((data) => {
                        deleteParticipant(data.id, eventId).then(() =>
                          setParticipantState(ParticipantState.NONE)
                        );
                      })
                    }
                  >
                    Cancel
                  </PrimaryButton>
                )}

              {participantState === ParticipantState.JOINED &&
                userId !== event.owner_id &&
                userId && (
                  <PrimaryButton
                    className={`${styles["action-btn"]} ${styles["action-2-btn"]}`}
                    onClick={() =>
                      getParticipantByUserId(userId, eventId).then((data) => {
                        deleteParticipant(data.id, eventId).then(() =>
                          setParticipantState(ParticipantState.NONE)
                        );
                      })
                    }
                  >
                    Leave
                  </PrimaryButton>
                )}

              {userId === event.owner_id && (
                <div className={styles["btns-container"]}>
                  {participantState === ParticipantState.NONE && (
                    <PrimaryButton
                      className={styles["isOwner-action-btn"]}
                      onClick={() => {
                        createParticipant(userId, eventId).then(() =>
                          getParticipantByUserId(userId, eventId).then(
                            (participant) => {
                              addParticipant(
                                userId,
                                eventId,
                                participant.id
                              ).then(() => {
                                setParticipantState(ParticipantState.JOINED);
                              });
                            }
                          )
                        );
                      }}
                    >
                      Join
                    </PrimaryButton>
                  )}

                  {participantState === ParticipantState.JOINED && (
                    <PrimaryButton
                      className={`${styles["isOwner-action-btn"]} ${styles["isOwner-action-2-btn"]}`}
                      onClick={() =>
                        getParticipantByUserId(userId, eventId).then((data) => {
                          deleteParticipant(data.id, eventId).then(() =>
                            setParticipantState(ParticipantState.NONE)
                          );
                        })
                      }
                    >
                      Leave
                    </PrimaryButton>
                  )}

                  <PrimaryButton className={styles["isOwner-edit-btn"]}>
                    Edit
                  </PrimaryButton>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {showAllParticipants && !showRequests && (
          <ParticipantsList
            event={event}
            handleGoBackToSideBar={handleShowAllParticipants}
            handleCloseWindow={handleCloseWindow}
            handleShowRequests={handleShowRequests}
            userId={userId}
            setReloadList={setReloadList}
            requests={requests}
            _event={event}
          />
        )}

        {showRequests && userId === ownerId && (
          <RequestsList
            _event={event}
            requests={requests}
            handleGoBackToParticipantsList={handleShowAllParticipants}
            handleCloseWindow={handleCloseWindow}
            setReloadList={setReloadList}
          />
        )}
      </div>
      ) )
    </AnimatePresence>
  );
};

export default EventInfoSideBar;
