import React from 'react';

const CasinoListItemWc = (props: any) => {
  const { games, onPlay } = props;

  return (
    <>
      {games?.map((Item: any, key: number) => {
        const imageUrl = Item.icon

        return (
          <div
            className="casino-list-item"
            onClick={(e) => {
              e.preventDefault();
              onPlay(Item);
            }}
            key={key}
          >
            <a href="#" className="">
              <div
                className="casino-list-item-banner"
                style={{ backgroundImage: `url(${imageUrl})` }}
              ></div>
            </a>
          </div>
        );
      })}
    </>
  );
};

export default React.memo(CasinoListItemWc);
