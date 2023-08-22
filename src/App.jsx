import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


import datas from "./Users.json";

function Button({ s, string, text }) {
  return <button onClick={() => s(string)}>{text}</button>;
}
function Welcome({ s }) {
  return (
    <div>
      <h1>
        Hi and thank you for participating in our global mission of helping our
        local trees survive.
      </h1>
      <Button string="logIn" s={s} text="Log in" />
      <Button string="learnMore" s={s} text="interested in learning more?" />
      <Button string="aboutUs" s={s} text="about us" />
      <Button string="createAccount" s={s} text="Create Account" />
    </div>
  );
}
function LearnMore({ s }) {
  return (
    <div>
      <h2>
        The Spotted Lanternfly (Lycorma delicatula) is native to China and was
        first detected in Pennsylvania in September 2014. Spotted lanternfly
        feeds on a wide range of fruit, ornamesntal and woody trees, with
        tree-of-heaven being one of the preferred hosts. Spotted lanternflies
        are invasive and can be spread long distances by people who move
        infested material or items containing egg masses. Juvenile spotted
        lanternflies, known as nymphs, and adults prefer to feed on the invasive
        tree of heaven (Ailanthus altissima) but also feed on a wide range of
        crops and plants, including grapes, apples, hops, walnuts and hardwood
        trees.
      </h2>
      <img
        src="https://thumbs.dreamstime.com/z/top-view-spotted-lanternfly-lycorma-delicatula-berks-county-pennsylvania-close-up-lycra-delicately-sitting-tree-invasive-160046474.jpg?w=768"
        alt="an adult spotted lanternfly"
      ></img>
      <Button string="welcome" s={s} text="return" />
    </div>
  );
}
function CreateAccount({ data, setData, s, setNames }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function checkAvailability({ username, s, setNames }) {
    if (username in data) {
      setUsername("");
      setPassword("");
      alert("such a username already exists, try another one.");
    } else if (!password) {
      alert("Enter a password");
    } else {
      let copy = data;
      copy[username] = {
        password: password,
        total: 0,
        "date joined": new Date().toDateString()
      };
      setData(copy);
      setNames(username);
      s("known");
    }
  }
  return (
    <div>
      <h3>choose a username and password</h3>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
        autoFocus
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        autoFocus
      />
      <button onClick={() => checkAvailability({ setNames, username, s })}>
        submit
      </button>
      <Button string="welcome" s={s} text="return" />
    </div>
  );
}

function LogIn({ data, names, setNames, s, setPassword, password }) {
  let dna;
  if (
    names in data &&
    data[names]["password"].toString() === password.toString()
  ) {
    dna = "known";
  } else {
    dna = "notKnown";
  }
  return (
    <div>
      <input
        onChange={(e) => setNames(e.target.value)}
        placeholder="username"
        autoFocus
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        autoFocus
      />
      <button onClick={() => s(dna)}>submit</button>
      <Button string="welcome" s={s} text="return" />
    </div>
  );
}
function MyProfile({ data, names, s }) {
  let score;
  if (data[names]["total"]) {
    score = <h1>I have killed {data[names]["total"]} immigrents!</h1>;
  } else {
    score = (
      <h1>Get to work {names} ! you haven't contributed yet to the cause.</h1>
    );
  }
  return (
    <div>
      <h1>I am a proud member!</h1>
      {score}
      <button onClick={() => s("welcome")}>return</button>
    </div>
  );
}
function NotFound({ s }) {
  return (
    <div>
      <h3>Sorry, we didn't find the information</h3>
      <button onClick={() => s("logIn")}>try again?</button>
      <button onClick={() => s("welcome")}>return</button>
    </div>
  );
}
function AboutUs({ data, s }) {
  let total = 0;
  for (let x in data) {
    total += data[x].total;
  }
  return (
    <div>
      <p>
        we have successfully killed {total} illegel immigrents with your help!
        (together with our {data.length} members).
      </p>
      <Button string={"topMembers"} s={s} text={"meet our members"} />
      <button onClick={() => s("welcome")}>return</button>
    </div>
  );
}
function TopMembers({ data }) {
  function member({ aMember, data }) {
    return `${aMember} has killed ${data[aMember]["total"]}`;
  }
  let ourMembers = "";
  for (let aMember of Object.keys(data)) {
    ourMembers += "\n" + member({ aMember, data });
  }
  return <div>{ourMembers}</div>;
}

function Page({
  data,
  setData,
  names,
  setNames,
  status,
  s,
  setPassword,
  password
}) {
  //const fs = require('fs');
  if (status === "welcome") {
    //fs.writeFile("Users.json", 'asagg');
    return <Welcome status={status} s={s} />;
  } else if (status === "learnMore") {
    return <LearnMore s={s} />;
  } else if (status === "logIn") {
    return (
      <LogIn
        names={names}
        data={data}
        setNames={setNames}
        s={s}
        setPassword={setPassword}
        password={password}
      />
    );
  } else if (status === "aboutUs") {
    return <AboutUs data={data} s={s} />;
  } else if (status === "known") {
    return <MyProfile data={data} names={names} s={s} />;
  } else if (status === "topMembers") {
    return <TopMembers data={data} />;
  } else if (status === "notKnown") {
    return <NotFound s={s} />;
  } else if (status === "createAccount") {
    return (
      <CreateAccount setNames={setNames} setData={setData} data={data} s={s} />
    );
  }
}

function App() {
  const [data, setData] = useState(datas);
  const [names, setNames] = useState("");
  const [status, s] = useState("welcome");
  const [password, setPassword] = useState("");
  //console.log(data)
  return (
    <div>
      <Page
        status={status}
        s={s}
        names={names}
        setNames={setNames}
        setPassword={setPassword}
        password={password}
        setData={setData}
        data={data}
      />
    </div>
  );
}
export default App
