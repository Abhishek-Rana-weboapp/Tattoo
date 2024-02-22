import React, { useContext, useEffect, useRef, useState } from "react";
import { GrAdd } from "react-icons/gr";
import { PiEye } from "react-icons/pi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { apiUrl } from "../url";
import UserContext from "../context/UserContext";

export default function ArtistList() {
  const [artistModalOpen, setArtistModalOpen] = useState(false);
  const { t } = useTranslation();
  const { alert, setAlert, setAlertMessage } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const inputRef = useRef();
  const token = sessionStorage.getItem("token");

  const fetchArtists = async () => {
    await axios
      .get(`${apiUrl}/artist/getAllArtists`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

    const artists = [
      "Adonay Llerena",
      "Barbie Gonzalez",
      "Cheppy Sotelo",
      "Daniel Proano",
      "Eduanis Rama",
      "Ernie Jorge",
      "Frank Gonzalez",
      "Gil Benjamin",
      "Jill Llerena",
      "Jose Gonzalez",
      "Keyla Valdes",
      "Konstantin Alexeyev",
      "Omar Gonzalez",
      "Omar Fame Gonzalez",
      "Osnely Garcia",
      "Yosmany Dorta",
    ];

  useEffect(() => {
    fetchArtists();
  }, []);

  useEffect(() => {
    if (artistModalOpen === true) {
      inputRef?.current?.focus();
    }
  }, [artistModalOpen]);

  const handleAddArtist = () => {
    if (artistModalOpen === false) {
      setArtistModalOpen(true);
    }
    if (artistModalOpen === true) {
      if (email)
        (async () => {
          await axios
            .post(
              `${apiUrl}/add_admin`,
              { username: email },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                }, //Temporary fix
              }
            )
            .then((res) => {
              if (res.status === 200) {
                setArtistModalOpen(!artistModalOpen);
                setAlertMessage(t("Invite Sent Successfully"));
                setAlert(!alert);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })();
    }
  };

  return (
    <>
      {artistModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
          <div className="w-full md:w-1/2  bg-white flex flex-col items-center gap-2 p-4 rounded-lg">
            <p className="text-xl font-bold text-black">
              Please Enter the Email
            </p>
            <input
              ref={inputRef}
              type="email"
              required
              className="p-2 rounded-lg w-full bg-gray-200 text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <button
              className=" bg-gradient-to-b from-[#f8f5f5] from-0% via-[#ffd21c] via-30% to-[#eb6d08] to-100% text-black py-2 px-8 rounded-3xl font-bold mt-4"
              onClick={handleAddArtist}
            >
              {t("Send Invite")}
            </button>
          </div>
        </div>
      )}
      <div className="w-full h-full overflow-hidden text-white flex flex-col gap-2 items-center">
        <div className="flex w-2/4">
          <h1 className="font-bold flex-1 text-center ">Artist List</h1>
          <button
            onClick={handleAddArtist}
            className="bg-yellow-400 rounded-lg px-2 text-black font-bold"
          >
            Add Artist
          </button>
        </div>
        <div className="w-2/4 flex justify-center overflow-y-scroll scrollbar-thin scrollbar-track-slate-[#000000] scrollbar-thumb-slate-400 scrollbar-rounded">
          <table className="w-full">
            <thead>
              <tr className="p-2 sticky top-0">
                <th className="capitalize font-bold bg-yellow-400 text-xl  text-black text-center p-2 w-1/4">
                  No
                </th>
                <th className="capitalize font-bold bg-yellow-400 text-xl  text-black text-center p-2 w-2/4">
                  Artist Name
                </th>
                <th className="capitalize font-bold bg-yellow-400 text-xl  text-black text-center p-2 w-1/4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {artists?.map((artist, index) => {
                return (
                  <tr key={artist} className={`p-2`}>
                    <td className="p-2 w-1/4 text-center text-xl font-bold">
                      {index + 1}
                    </td>
                    <td className="p-2 w-2/4 text-center text-xl font-bold">
                      {artist}
                    </td>
                    <td className="p-2 w-1/4 text-center text-xl font-bold">
                      <span className="flex gap-1 justify-center">
                        <div className="p-2 hover:cursor-pointer hover:bg-yellow-400 hover:text-black rounded-md">
                          <PiEye size={20} />
                        </div>
                        <div className="p-2 hover:cursor-pointer hover:bg-yellow-400 hover:text-black rounded-md">
                          <GrAdd size={20} />
                        </div>
                        <div className="p-2 hover:cursor-pointer hover:bg-yellow-400 hover:text-black rounded-md">
                          <RiDeleteBin2Line size={20} />
                        </div>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
