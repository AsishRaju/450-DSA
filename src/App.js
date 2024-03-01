import React, { useState, useEffect, createContext, useContext } from "react";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import {
  getData,
  updateDBData,
  resetDBData,
  exportDBData,
  importDBData,
} from "./services/dbServices";
import { saveAs } from "file-saver";
import Spinner from "react-bootstrap/Spinner";
import TopicCard from "./components/TopicCard/TopicCard";
import Topic from "./components/Topic/Topic";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import ReactGA from "react-ga4";
import "./App.css";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import ResetPassword from "./pages/reset-password/ResetPassword";
import { GlobalContext } from "./context/GlobalContext";
import VerifyEmail from "./pages/verify-email/VerifyEmail";
import { localStorageKeyForAuthentication } from "./services/constants";
import axios from "axios";
import { GET_LOGGED_IN_USER_DETAILS, GET_USER_PROGRESS } from "./services/url";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Badge } from "react-bootstrap";

function App() {
  const history = useHistory();
  // setting state for data received from the DB
  const [questionData, setquestionData] = useState([]);

  // getting from ContextAPI
  const { dark, setDark, isLoggedIn, setIsLoggedIn, setUser, user } =
    useContext(GlobalContext);

  const [loading, setLoading] = useState(true);
  // Fetch User data
  const getLoggedInUserData = async () => {
    try {
      const key = localStorage.getItem(localStorageKeyForAuthentication);
      const { data } = await axios.get(GET_LOGGED_IN_USER_DETAILS, {
        validateStatus: false,
        headers: {
          authToken: key,
        },
      });
      if (data.success) {
        setIsLoggedIn(true);
        setUser(data.data);
      } else {
        history.push("/login");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch User Progress
  const getUserProgress = async () => {
    try {
      const token = localStorage.getItem(localStorageKeyForAuthentication);
      // if user is logged in get the data from Database
      // else take from local storage
      if (token) {
        const res = await axios.get(GET_USER_PROGRESS, {
          validateStatus: false,
          headers: {
            authToken: token,
          },
        });
        const resData = res?.data;
        if (resData?.success) {
          const data = resData.data;
          data.sort((a, b) => a.position - b.position);
          setquestionData(data);
        } else {
          toast.info(resData.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  // get logged in user info
  useEffect(() => {
    // if we have localStorage key
    if (localStorage.getItem(localStorageKeyForAuthentication)) {
      // && not logged in
      if (isLoggedIn === false) {
        getLoggedInUserData();
      }
      getUserProgress();
    } else {
      getData((qd) => setquestionData(qd));
      setLoading(false);
    }
  }, [isLoggedIn]);

  // useEffect for fetching data from DB on load and init GA
  useEffect(() => {
    localStorage.removeItem("cid");
    // ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
    // getData((QuestionData) => {
    //   setquestionData(QuestionData);
    // });

    //implementing dark theme mode option
    // checking if dark mode "isDark" is already declared or not
    if (!("isDark" in window.localStorage)) {
      window.localStorage.setItem("isDark", dark);
    } else {
      // initialising the value of dark with the already stored value
      let temp = window.localStorage["isDark"];
      if (temp === "false") {
        setDark(false);
      } else {
        setDark(true);
      }
    }
  }, []);

  //to update progress in '/' route and also update DB
  function updateData(key, topicData, topicPosition) {
    let reGenerateUpdatedData = questionData.map((topic, index) => {
      if (index === topicPosition) {
        updateDBData(key, topicData);
        return {
          topicName: topic.topicName,
          position: topic.position,
          ...topicData,
        };
      } else {
        return topic;
      }
    });
    setquestionData(reGenerateUpdatedData);
  }

  // reset and clear DB
  function resetData() {
    resetDBData((response) => {
      setquestionData([]);
      window.location.replace(window.location.origin);
    });
  }

  // export 450DSA-Progress data

  function exportData(callback) {
    exportDBData((data) => {
      const fileData = JSON.stringify(data);
      const blob = new Blob([fileData], { type: "text/plain" });
      saveAs(blob, "progress.json");
      callback();
    });
  }

  // import 450DSA-Progress data

  function importData(data, callback) {
    importDBData(data, (QuestionData) => {
      setquestionData(QuestionData);
      callback();
    });
  }

  return (
    <Router>
      <div className={dark ? "App dark" : "App"}>
        {/* <div 
			className='banner'
			style={
				{
					display:'flex', 
					justifyContent:'center', 
					alignItems:'center',
					height:'50px',
					boxShadow: 'rgba(0 0 0 / 10%) 0 4px 12px'
				}
			}>
				<a href="http://bit.ly/3LJ2Tnc" target="_blank">
				Want to test your DSA  skills and get recruiters to see your strong coding profile. Register here !
				</a>
			</div> */}
        <ToastContainer />
        <h1
          className="app-heading text-center mt-4"
          style={{ color: dark ? "white" : "" }}
        >
          450 DSA Cracker
        </h1>
        {isLoggedIn ? (
          <></>
        ) : (
          <h5 className="text-center ">
            Wanna Save Progress?{" "}
            <Link to={"/login"}>
              Login
              <Badge
                variant={dark ? "light" : "dark"}
                className="hvr-grow ml-3 bg-success"
              >
                New{" "}
              </Badge>
            </Link>
          </h5>
        )}
        {questionData.length === 0 && isLoggedIn === false ? (
          // load spinner until data is fetched from DB
          <div className="d-flex justify-content-center">
            <Spinner animation="grow" variant="success" />
          </div>
        ) : (
          <>
            {/* HOME AND ABOUT ROUTE */}
            <Route
              exact
              path="/"
              children={
                loading ? (
                  <></>
                ) : (
                  <TopicCard questionData={questionData}></TopicCard>
                )
              }
            />
            <Route
              path="/about"
              children={
                <About
                  resetData={resetData}
                  exportData={exportData}
                  importData={importData}
                  setQuestionData={setquestionData}
                ></About>
              }
            />
            {/* TOPIC ROUTE */}
            <Route
              path="/array"
              children={
                <Topic data={questionData[0]} updateData={updateData} />
              }
            />
            <Route
              path="/matrix"
              children={
                <Topic data={questionData[1]} updateData={updateData} />
              }
            />
            <Route
              path="/string"
              children={
                <Topic data={questionData[2]} updateData={updateData} />
              }
            />
            <Route
              path="/search_sort"
              children={
                <Topic data={questionData[3]} updateData={updateData} />
              }
            />
            <Route
              path="/linked_list"
              children={
                <Topic data={questionData[4]} updateData={updateData} />
              }
            />
            <Route
              path="/binary_trees"
              children={
                <Topic data={questionData[5]} updateData={updateData} />
              }
            />
            <Route
              path="/bst"
              children={
                <Topic data={questionData[6]} updateData={updateData} />
              }
            />
            <Route
              path="/greedy"
              children={
                <Topic data={questionData[7]} updateData={updateData} />
              }
            />
            <Route
              path="/backtracking"
              children={
                <Topic data={questionData[8]} updateData={updateData} />
              }
            />
            <Route
              path="/stacks_queues"
              children={
                <Topic data={questionData[9]} updateData={updateData} />
              }
            />
            <Route
              path="/heap"
              children={
                <Topic data={questionData[10]} updateData={updateData} />
              }
            />
            <Route
              path="/graph"
              children={
                <Topic data={questionData[11]} updateData={updateData} />
              }
            />
            <Route
              path="/trie"
              children={
                <Topic data={questionData[12]} updateData={updateData} />
              }
            />
            <Route
              path="/dynamic_programming"
              children={
                <Topic data={questionData[13]} updateData={updateData} />
              }
            />
            <Route
              path="/bit_manipulation"
              children={
                <Topic data={questionData[14]} updateData={updateData} />
              }
            />
            <Route path="/login" children={<Login />} />
            <Route path="/register" children={<Register />} />
            <Route path="/forgot-password" children={<ForgotPassword />} />
            <Route path="/reset-password" children={<ResetPassword />} />
            <Route path="/verify-email" children={<VerifyEmail />} />
          </>
        )}
        <Footer dark={dark} setDark={setDark}></Footer>
      </div>
    </Router>
  );
}

export default App;
