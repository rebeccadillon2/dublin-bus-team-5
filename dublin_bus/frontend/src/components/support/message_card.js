import axios from "axios";
import { useTheme } from "../../hooks";

import "./support.css";

export function MessageCard({
  email,
  item,
  is_super_user,
  contents,
  set_contents,
}) {
  const [is_dark] = useTheme();

  const devUrl = `http://127.0.0.1:8000`;
  const prodUrl = ``;
  const baseUrl = process.env.NODE_ENV === "production" ? prodUrl : devUrl;

  //delete
  const delete_one = async (e) => {
    const id_ = e.currentTarget.dataset.id;
    let res = await axios.get(`${baseUrl}/del/${id_}/`);
    if (res.data["state"] == "ok") {
      set_contents(contents.filter((item) => item.id != id_));
    }
  };

  //回复
  const update_reply = async (e) => {
    const id_ = e.currentTarget.dataset.id;
    const textarea = document.getElementById("textarea__" + id_.toString());
    //console.log(id_);
    //console.log(textarea.value);
    //Write to database
    const data = {
      id: id_,
      reply: textarea.value,
      reply_email: email,
    };
    let res = await axios.post(`${baseUrl}/update/`, data);
    //console.log(res);
    const newState = contents.map((obj) => {
      if (obj.id == id_) {
        return {
          ...obj,
          reply: textarea.value,
          reply_email: email,
          reply_time: res.data["reply_time"],
        };
      }
      return obj;
    });
    set_contents(newState);
    textarea.value = "";
  };

  return (
    <div className={`${is_dark ? "card card_dark" : "card"}`} key={item.id}>
      <div className='user_info'>
        <span>
          created by {item.email} at {item.creat_time}
        </span>
      </div>
      <div className='detail'>
        <span
          className={`${is_dark ? "large_font large_font_dark" : "large_font"}`}
        >
          {item.content}
        </span>
      </div>
      <div className='reply'>
        {item.reply != "" ? (
          <span>
            {item.reply_email.split("@")[0]} reply at {item.reply_time}:
          </span>
        ) : (
          <span>no reply yet</span>
        )}

        {is_super_user ? (
          <>
            <span
              className={`${
                is_dark ? "large_font large_font_dark" : "large_font"
              }`}
            >
              {item.reply}
            </span>
            <textarea
              placeholder='please input your reply...'
              id={"textarea__" + item.id.toString()}
              className={`${is_dark ? "textarea_dark" : ""}`}
            ></textarea>
            <div className='reply_btn_div'>
              <button data-id={item.id} onClick={(e) => update_reply(e)}>
                <span>Reply</span>
              </button>
              <button data-id={item.id} onClick={(e) => delete_one(e)}>
                <span>Delete</span>
              </button>
            </div>
          </>
        ) : (
          <span
            className={`${
              is_dark ? "large_font large_font_dark" : "large_font"
            }`}
          >
            {item.reply}
          </span>
        )}
      </div>
    </div>
  );
}
