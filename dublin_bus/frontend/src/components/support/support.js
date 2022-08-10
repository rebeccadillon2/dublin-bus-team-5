import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { baseUrl, headers } from "../../lib/api";

import { useTheme } from "../../hooks";
import { getPayload, isUserAuthenticated } from "../../lib/auth";
import { MessageCard } from "./message_card";

import "./support.css";

export function Support() {
  const [is_dark] = useTheme();
  //Current work order for login email
  const [contents, set_contents] = useState([]);

  //textarea's ref
  const text_input = useRef();

  //Current email login
  const [email, set_email] = useState(null);
  let email_ = null;
  //If user is the administrator
  const [is_super_user, set_super] = useState(false);
  let is_super_user_ = false;

  //Get user information, set status
  const getUserInfo = async () => {
    const userId = getPayload().sub;

    const { data } = await ((userId) => {
      return axios.get(`${baseUrl}/api/auth/profile/${userId}/`, headers());
    })(userId);

    set_email(data.email);
    email_ = data.email;
    if (data.isSuperuser) {
      set_super(true);
      is_super_user_ = true;
    }
    console.log(data);
    console.log(email_);
  };

  //Get the work order of the currently logged-in person
  const get_content = (email_) => {
    return axios.get(`${baseUrl}/get/${email_}/`);
  };

  //Get work orders for everyone
  const get_all_content = () => {
    return axios.get(`${baseUrl}/get/all/`);
  };

  //Update work order status
  const update_content_state = async (email_) => {
    let data = null;
    //Administrators get all work orders
    if (is_super_user_) {
      data = await get_all_content();
    }
    //General users get their own work orders
    else {
      data = await get_content(email_);
    }

    if (data != null) {
      const contents = data.data;
      for (let i = 0; i < contents.length; i++) {
        console.log(contents[i]);
        set_contents((old_arr) => [...old_arr, contents[i]]);
      }
    }
  };

  //Add a new work order for the current person to the database
  const add_content = async (e) => {
    const email_ = e.currentTarget.dataset.email;
    console.log(email_);
    if (email_ != null) {
      const data = {
        email: email_,
        content: text_input.current.value,
        reply: "",
        reply_time: "",
        reply_email: "",
      };
      let res = await axios.post(`${baseUrl}/add/`, data);
      data["id"] = res.data["id"];
      data["creat_time"] = res.data["creat_time"];
      console.log(res);
      set_contents((old_arr) => [...old_arr, data]);
      text_input.current.value = "";
    }
  };

  //If it is in the login state, get the user information, get the work order
  useEffect(() => {
    const ready = async () => {
      if (isUserAuthenticated()) {
        await getUserInfo();
        if (email_) {
          await update_content_state(email_);
        }
      }
    };

    ready();
  }, []);

  return (
    <div className='support_div collapse' id='collapse_support'>
      <div className='support'>
        {contents.map((item, index) => {
          return (
            <MessageCard
              email={email}
              key={item.id}
              item={item}
              is_super_user={is_super_user}
              contents={contents}
              set_contents={set_contents}
            />
          );
        })}
      </div>

      {is_super_user ? (
        <span></span>
      ) : (
        <div className='fixed_input_div'>
          <div className='input_div'>
            <textarea
              ref={text_input}
              placeholder='please input your problems...'
              rows='3'
              cols='80'
              className={`${is_dark ? "t_dark" : ""}`}
            ></textarea>
            <button onClick={(e) => add_content(e)} data-email={email}>
              <span>Add</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
