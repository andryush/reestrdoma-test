import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";

import Container from "@material-ui/core/Container";
import Header from "./components/Header/Header";
import Authorization from "./components/Authorization/Authorization";
import HouseList from "./components/HouseList/HouseList";

import { API_URL } from "./api/api";

const cookies = new Cookies();

function App() {
  const [token, setToken] = useState(cookies.get("token") || "");
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(0);
  const [houses, setHouses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const updateToken = (token: string): void => {
    setToken(token);
    cookies.set("token", token, { path: "/", maxAge: 3600 });
  };

  const updateSelectedCompany = (e: any): void => {
    setSelectedCompany(e.target.value);
  };

  const updateCurrentPage = (e: object, page: number): void => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (token.length > 0) {
      fetch(`${API_URL}reestrdoma/companies/`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((data) => setCompanies(data.data));
    }
  }, [token]);

  useEffect(() => {
    if (selectedCompany !== 0) {
      setIsLoading(true);
      fetch(
        `${API_URL}reestrdoma/company/houses/${selectedCompany}/?page=${currentPage}&perPage=${10}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setHouses(data.data);
          setCurrentPage(data.links.currentPage);
          setLastPage(data.links.lastPage);
          setIsLoading(false);
        });
    }
  }, [selectedCompany, token, currentPage]);

  return (
    <>
      <Header />
      <Container>
        {token === "" ? (
          <Authorization updateToken={updateToken} />
        ) : (
          <HouseList
            companies={companies}
            selectedCompany={selectedCompany}
            updateSelectedCompany={updateSelectedCompany}
            updateCurrentPage={updateCurrentPage}
            houses={houses}
            lastPage={lastPage}
            isLoading={isLoading}
            currentPage={currentPage}
          />
        )}
      </Container>
    </>
  );
}

export default App;
