import React, { useState, useEffect } from "react";

import { Header } from "../journey";
import { getPayload } from "../../lib/auth";
import { RoutesSearch } from "../elements/form";

export function RoutesContent({ allRoutes, selectedRoute, setSelectedRoute }) {
  const userId = getPayload().sub;
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [favRoutes, setFavRoutes] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // useEffect(() => {
  //   if (selectedRoute === null) {
  //     return;
  //   }
  //   console.log("New route selected");
  // }, [selectedRoute]);

  return (
    <div>
      <div className='flex items-center justify-between ml-1'>
        <Header variant={true} title={"Routes"} />
        {/* Fav goes here */}
      </div>

      <div className='mb-4 mt-2'>
        <RoutesSearch
          routes={allRoutes}
          searchTerm={searchTerm}
          selectedRoute={selectedRoute}
          setSearchTerm={setSearchTerm}
          setSelectedRoute={setSelectedRoute}
        />
      </div>
      <div></div>
    </div>
  );
}
