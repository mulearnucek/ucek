import React from "react";
import Image from "next/image";

import Principal from "@/public/img/administrative/principal.png";
import Chancellor from "@/public/img/administrative/chancellor.jpg";
import ProChancellor from "@/public/img/administrative/pro_chancellor.jpg";
import ViceChancellor from "@/public/img/administrative/vice_chancellor.jpg";
import Registrar from "@/public/img/administrative/registrar.jpg";

const data = {
  administrationPanel: [
    {
      id: 2,
      src: Chancellor,
      name: "Shri. Rajendra Vishwanath Arlekar",
      position: "Chancellor",
      org: "The Hon'ble Governor of Kerala",
    },
    {
      id: 3,
      src: ProChancellor,
      name: "Dr. R Bindu",
      position: "Pro-Chancellor",
      org: "The Hon'ble Minister for Higher Education",
    },
    {
      id: 4,
      src: ViceChancellor,
      name: "Prof. Mohanan Kunnummal",
      position: "Vice Chancellor",
      org: "University of Kerala",
    },
    {
      id: 5,
      src: Registrar,
      name: "Dr. K S Anil Kumar",
      position: "Registrar",
      org: "University of Kerala",
    },
    {
      id: 1,
      src: Principal,
      name: "Dr. Bisharathu Beevi A",
      position: "Principal",
      org: "University College of Engineering",
    },
  ],
};

const AdministrationPanel = () => {
  return (
    <div className="pt-4 bg-white">
      <h2 className="text-2xl md:text-[2.6rem] ml-4 md:ml-20 font-bold mb-6 flex items-center">
        <span className="w-2 h-6 bg-blue-500 mr-2"></span> Administration Panel
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 2xl:grid-cols-5  py-10 px-4 md:px-20 justify-items-center md:justify-items-start">
        {data.administrationPanel.map((member) => (
          <div key={member.id} className="flex items-start flex-col w-64">
            <Image
              src={member.src}
              alt={`Member ${member.id}`}
              className="rounded-lg object-cover w-[250px] h-[250px] prevent-select brightness-[.90]"
              width={250}
              height={250}
            />
            <div className="">
              <h3 className="text-[17px] md:text-[17px] font-semibold">
                {member.name}
              </h3>
              <p className="text-gray-500">{member.position}</p>
              <p className="text-gray-500">{member.org}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdministrationPanel;
