import "./App.scss";
import { Modal } from "./components/Modal";
import { useModal } from "./components/Modal/useModal";
import ShareLocation from "./components/ShareLocation";
import Map from "./components/Map";
import { useSelector } from "react-redux";
import { LocationStateType } from "./redux/reducer";
import { useEffect } from "react";
const mapState = (state: LocationStateType) => {
  return {
    locations: state.locations,
  };
};
function App() {
  const { isShown, toggle } = useModal();
  const { locations } = useSelector(mapState);
  useEffect(() => {
    !locations.length && toggle();
  }, [locations]);// eslint-disable-line react-hooks/exhaustive-deps
  
  const shareLocation = <ShareLocation hideModal={toggle} />;

  return (
    <div className="app">
      <Map toggle={toggle} />
      <Modal
        headerText="Share Location"
        isShown={isShown}
        hide={toggle}
        modalContent={shareLocation}
      />
    </div>
  );
}

export default App;
