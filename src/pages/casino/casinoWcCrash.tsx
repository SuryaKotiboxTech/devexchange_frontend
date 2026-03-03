import { AxiosResponse } from 'axios'
import React from 'react'
import { useAppSelector } from '../../redux/hooks'
import { useDispatch } from 'react-redux'
import casinoService from '../../services/casino.service'
import {
  selectCasinoMatchList,
} from '../../redux/actions/casino/casinoSlice'

import { useParams, useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { CustomLink } from '../_layout/elements/custom-link'
import CasinoListItemInt from '../CasinoList/CasinoListItemInt'
import authService from '../../services/auth.service'
import { isMobile } from 'react-device-detect'

import dataJson from './wc_casino_response.json';
import { WcCasinoResponse } from './wcCasinoTypes';
import CasinoListItemWc from '../CasinoList/CasinoListItemWc'
import LoaderIcon from './loaderIcon'

const wc_casino_response = dataJson as WcCasinoResponse;

const CasinoWcCrash = () => {
  const queryp = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const category = searchParams.get("category");

  const [providers, setProviders] = React.useState<any>([]);
  const [games, setGames] = React.useState<any>([]);
  const [activeProvider, setActiveProvider] = React.useState<string>("");
  const [gamePlay, setGamePlay] = React.useState<any>(null);
  const [gameUrl, setGameUrl] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const getTitleWB = (gType: number) => {
    switch (gType) {
      case 1:
        return { first: "Evolution", second: "Asia", third: "Games" };
      case 17:
        return { first: "Ezugi", second: "Live", third: "Games" };
     case 11:
        return { first: "Live", second: "88", third: "Games" };
      case 105:
        return { first: "BTI", second: "Sports", third: "Games" };
      case 300:
        return { first: "Spribe", second: "All", third: "Games" };
      case 263:
        return { first: "JiLi", second: "All", third: "Games" };
      default:
        return { first: "WB", second: "Other", third: "Games" };
    }
  };

  React.useEffect(() => {
    const gameList = wc_casino_response.game_list;

     const ALLOWED_PROVIDERS = [300];

    const provArr = Object.keys(gameList)
      .map(Number)
      .filter((provId) => ALLOWED_PROVIDERS.includes(provId))
      .map((provId) => {
        const title = getTitleWB(provId);
        return {
          _id: String(provId),
          title_first: title.first,
          title_second: title.second,
          title_third: title.third,
        };
      });

    setProviders(provArr);

    const defaultProv = category || provArr[0]?._id || "1";
    setActiveProvider(defaultProv);

    // If on root path without category, redirect to casino with default category
    if (location.pathname === '/' && !category && provArr[0]?._id) {
      navigate(`/wc-casino/wc-casino?category=${provArr[0]._id}`, { replace: true });
      return;
    }

    const providerGames = (gameList[defaultProv] || []).map(g => ({
      ...g,
      gType: defaultProv
    }));

    setGames(providerGames);
  }, [category, location.pathname, navigate]);

  // When clicking provider from <CustomLink>
  React.useEffect(() => {
    const gameList = wc_casino_response.game_list;

    if (activeProvider) {
      const providerGames = (gameList[activeProvider] || []).map(g => ({
        ...g,
        gType: activeProvider
      }));

      setGames(providerGames);
    }
  }, [activeProvider]);

  React.useEffect(() => {
    const launchGame = async () => {
      if (!gamePlay) {
        setGameUrl('');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setGameUrl(''); // Clear old URL immediately

      console.log("Launching game:", gamePlay);

      const userInfo = await authService.getUser?.() || null;
      const uid = userInfo?.data?.data?.user?._id || '123456789';

      let prd;

      // Live table games use table_id
      if (gamePlay.table_id) {
        prd = {
          id: Number(gamePlay.gType),
          type: 0,
          table_id: gamePlay.table_id,
          is_mobile:  isMobile ? 1 : 0,
        };
      } 
      // Others use game_id
      else {
        prd = {
          id: Number(gamePlay.gType),
          type: gamePlay.game_id,
          is_mobile:  isMobile ? 1 : 0,
        };
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASEURL_V1}authWBGames`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${authService.getToken()}`
          },
          body: JSON.stringify({
            user_code: String(uid),
            prd,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();

        if (result?.data?.launch_url) {
          setGameUrl(result?.data?.launch_url);
        } else {
          throw new Error("Invalid WB response");
        }

      } catch (err: any) {
        console.error("WB Game Launch Error:", err);
        alert(err.message || "Game launch failed");
        setGamePlay(null);
        setIsLoading(false);
      }
    };

    launchGame();
  }, [gamePlay]);

  // Function to close game - clears all states
  const closeGame = () => {
    setGameUrl('');
    setGamePlay(null);
    setIsLoading(false);
  };

  return (
    <>
      <div className='container-fluid container-fluid-5 cas-in-list'>
        <div className='row row5'>
          
          {/* Provider Sidebar */}
          <div className='col-xl-2 d-none d-xl-flex' style={{ marginTop: "5px" }}>
            <ul className="nav nav-pills casino-sub-tab">
              {providers.map((prov: any, key: number) => (
                <li className="nav-item" key={key}>
                  <CustomLink
                    className={`nav-link ${prov._id == activeProvider ? "active" : ""}`}
                    to={`/wc-casino/${queryp.type}?category=${prov._id}`}
                  >
                    <span>{prov.title_first} {prov.title_second}</span>
                  </CustomLink>
                </li>
              ))}
            </ul>
          </div>

          <div className='col-xl-10 col-12 d-xl-none'>
            <div className="casino-sub-tab-list" style={{marginTop:"5px"}}>
              <ul className="nav nav-pills casino-sub-tab" id="casino-sub-tab">
                {providers.map((prov: any, key: number) => (
                <li className="nav-item" key={key}>
                  <CustomLink
                    className={`nav-link ${prov._id == activeProvider ? "active" : ""}`}
                    to={`/wc-casino/${queryp.type}?category=${prov._id}`}
                  >
                    <span>{prov.title_first} {prov.title_second}</span>
                  </CustomLink>
                </li>
              ))}
               
              </ul>
            </div>
          </div>

          {/* Game list */}
          <div className='col-xl-10 col-12'>
            <div className='casino-list mt-2' style={{ marginLeft: "-6px" }}>
              {games.length > 0 && (
                <CasinoListItemWc
                  games={games}
                  onPlay={(game: any) => {
                    // Close any existing game first
                    if (gamePlay) {
                      closeGame();
                      // Small delay to ensure cleanup
                      setTimeout(() => setGamePlay(game), 100);
                    } else {
                      setGamePlay(game);
                    }
                  }}
                />
              )}
            </div>
          </div>

        </div>
      </div>

   


      {gamePlay && (
        <div className="slot-iframe show">
          
          {/* HEADER (always visible) */}
          <div className="slot-header">
            <div className="title">
              <h4 className="mb-0 slot-title">{gamePlay.game_name}</h4>
            </div>

            <div className="close-slot-frame" onClick={closeGame}>
              EXIT
            </div>
          </div>

          {/* IFRAME WRAPPER */}
          <div
            className="iframe-wrapper"
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
          >
            {/* Loader (ONLY inside iframe area) */}
            {isLoading && (
              <LoaderIcon
                img="data:image/png;base64,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"
                title="Please wait..."
                style={{ width: "180px", marginBottom: "40px" }}
              />

              
            )}

            {/* IFRAME */}
            {gameUrl && (
              <iframe
                src={gameUrl}
                title="Game"
                style={{
                  width: "100%",
                  // height: "100%",
                  border: "none",
                }}
                onLoad={() => {
                  console.log("Game fully loaded");
                  setIsLoading(false);
                }}
              />
            )}
          </div>
        </div>
      )}

    </>
  );
};

export default CasinoWcCrash