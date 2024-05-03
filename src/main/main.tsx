import React, {
  Fragment,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import MessageIcon from "../icons/MessageIcon";
import MSLocator from "../MSLocator/MSLocator";
import MSLiaisonLocator from "../MSLiaisonLocator/MSLiaisonLocator";
import MSLSearched from "../MSLSearched/MSLSearched";
import Button from "../components/atoms/buton";

interface Props {
  label?: string;
  icon?: ReactElement;
}

interface zipDataProp {
  data: [
    attributes: {
      zipcode: string;
      mslProfileInfo: {
        data: {
          attributes: {
            fullName: string;
            email: string;
            profileImage: {
              data: {
                attributes: {
                  formats: {
                    thumbnail: {
                      url: string;
                    };
                    small: {
                      url: string;
                    };
                    medium: {
                      url: string;
                    };
                  };
                };
              };
            };
          };
        };
      };
    }
  ];
}

const Main = ({ label, icon }: Props) => {
  let data;
  const [showMSL, setShowMSL] = useState(false);
  const [localZipCode, setLocalZipCode] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [notFound, setNotFound] = useState("");
  const [isSearched, setIsSearched] = useState(
    typeof localStorage != "undefined"
      ? localStorage?.zipItem !== undefined
        ? true
        : false
      : false
  );
  let zipData: any;

  async function getCall(zipCode: string) {
    // console.log(values.zipCode);
    const data = await fetch(
      `https://san-2215677-qa-cac-inv-web.azurewebsites.net/api/msl-zipcode-maps?filters[zipcode][$eqi]=${zipCode}&populate=mslProfileInfo.profileImage`
    )
      .then((res) => {
        console.log(res);
        zipData = res;
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  useEffect(() => {
    if (localZipCode != undefined && localZipCode != "") {
      getCall(localZipCode);
    }
  }, [localZipCode]);
  useEffect(() => setNotFound(""), [showMSL, zipCode]);

  useEffect(() => {
    if (zipData) {
      if (zipData?.data.length !== 0) {
        setIsSearched(true);
        const data = zipData?.data[0];
        const body = {
          zipcode: data?.attributes?.zipcode,
          name: data?.attributes?.mslProfileInfo?.data?.attributes?.fullName,
          email: data?.attributes?.mslProfileInfo?.data?.attributes?.email,
          image:
            data?.attributes?.mslProfileInfo?.data?.attributes?.profileImage
              ?.data?.attributes?.formats?.thumbnail?.url ||
            data?.attributes?.mslProfileInfo?.data?.attributes?.profileImage
              ?.data?.attributes?.formats?.small?.url ||
            data?.attributes?.mslProfileInfo?.data?.attributes?.profileImage
              ?.data?.attributes?.formats?.medium?.url,
        };
        localStorage.setItem("zipItem", JSON.stringify(body));
      } else {
        setNotFound("ZIP code not found");
      }
    } else {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      data =
        typeof localStorage != "undefined" && localStorage.zipItem !== undefined
          ? JSON.parse(localStorage.zipItem)
          : null;
    }
  }, [zipData]);

  const handleClose = () => {
    setShowMSL(false);
  };
  return (
    <>
      <Button label={label} icon={icon} setShowMSL={setShowMSL} />
      {localZipCode != undefined &&
      localZipCode != "undefined" &&
      localZipCode != ""
        ? showMSL && <MSLocator onClose={handleClose} />
        : isSearched
        ? showMSL && (
            <MSLSearched onClose={handleClose} setIsSearched={setIsSearched} />
          )
        : showMSL && (
            <MSLiaisonLocator
              onClose={handleClose}
              errorMsg={notFound}
              search={getCall}
            />
          )}
    </>
  );
};

export default Main;
