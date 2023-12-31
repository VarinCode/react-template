import { useState, useRef, useCallback } from "react";
import Button from "./Button";
import img from "../assets/bg/juli-kosolapova-EU-F64WOqD8-unsplash.jpg";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const Form = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState("");

  const fnameRef = useRef(null);
  const lnameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const apiPath = import.meta.env.VITE_BACKEND_API.concat(
    `/sentData?firstname=${firstname}&lastname=${lastname}&email=${email}&message=${message}`
  );

  const clearForm = () => {
    fnameRef.current.value = "";
    lnameRef.current.value = "";
    emailRef.current.value = "";
    messageRef.current.value = "";
  };

  const callback = useCallback(() => {
    setTimeout(() => {
      MySwal.fire({
        icon: "success",
        title: <h1>บันทึกแบบฟอร์มสำเร็จ</h1>,
        text: data,
        showConfirmButton: false,
        timer: 1700,
      });
    }, 400);
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const options = {
      method: "GET",
      header: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(apiPath, options);
      setData(await response.text());
    } catch (e) {
      console.error(e);
    } finally {
      clearForm();
      callback();
    }
  };

  return (
    <section className="flex w-full h-max lg:flex-col md:flex-col sm:flex-col items-stretch font-poppins shadow-2xl">
      <div className="w-1/2 h-full lg:w-full md:w-full sm:w-full">
        <img src={img} className="w-full h-full" loading="lazy" />
      </div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="w-1/2 lg:w-full md:w-full sm:w-full flex flex-col justify-center lg:-mt-1 md:-mt-1 sm:-mt-1 text-slate-100 capitalize p-[40px] tracking-wide bg-slate-950"
      >
        <div>
          <header className="text-center mb-12 text-2xl lg:text-2xl md:text-xl sm:text-xl font-bold">
            sent message
          </header>
        </div>
        <div className=" flex items-center justify-between flex-wrap gap-x-6">
          <span className="flex-1">
            <label
              htmlFor="firstname"
              className="block mb-2 font-bold text-xl md:text-lg sm:text-lg"
            >
              firstname
            </label>
            <input
              type="text"
              placeholder="firstname"
              id="firstname"
              name="firstname"
              className=" outline-none border-none w-full h-10 text-lg rounded-md p-6 caret-black text-black placeholder:capitalize"
              required
              autoSave={"false"}
              spellCheck={false}
              autoComplete={"false"}
              onChange={(e) => setFirstname(e.target.value)}
              ref={fnameRef}
            />
          </span>
          <span className="flex-1">
            <label
              htmlFor="lastname"
              className="block mb-2 font-bold text-xl md:text-lg sm:text-lg"
            >
              lastname
            </label>
            <input
              type="text"
              placeholder="lastname"
              id="lastname"
              name="lastname"
              className=" outline-none border-none w-full h-10 text-lg rounded-md p-6 caret-black text-black placeholder:capitalize"
              required
              autoSave={"false"}
              spellCheck={false}
              autoComplete={"false"}
              onChange={(e) => setLastname(e.target.value)}
              ref={lnameRef}
            />
          </span>
        </div>
        <div className="mt-4">
          <label
            htmlFor="email"
            className="block mb-2 font-bold text-xl md:text-lg sm:text-lg"
          >
            email
          </label>
          <input
            type="email"
            placeholder="email"
            id="email"
            name="email"
            className="outline-none border-none w-3/4 h-10 text-lg rounded-md p-6 caret-black text-black placeholder:capitalize"
            required
            autoSave={"false"}
            spellCheck={false}
            autoComplete={"false"}
            onChange={(e) => setEmail(e.target.value)}
            ref={emailRef}
          />
        </div>
        <div className="mt-4 w-full">
          <label
            htmlFor="message"
            className="block mb-2 font-bold text-xl md:text-lg sm:text-lg"
          >
            message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Enter some text"
            className="resize-none w-full p-6 outline-none rounded-md border-none text-black text-sm placeholder:capitalize"
            required
            onChange={(e) => setMessage(e.target.value)}
            ref={messageRef}
          ></textarea>
        </div>
        <Button
          text={"send"}
          style={
            "my-8 w-full h-12 border-2 rounded-md font-bold capitalize text-white text-lg bg-transparent duration-300 ease-in-out hover:bg-white hover:text-black active:translate-y-2"
          }
          type={"submit"}
        />
      </form>
    </section>
  );
};

export default Form;
