import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { TouchableOpacity } from "react-native";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import PianoView from "../components/instruments/PianoView";
import { Ionicons } from "@expo/vector-icons";
import PadList from "../components/PadList";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import MuiscOption from "../components/MuiscOption";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    let id = setInterval(() => {
      savedCallback.current();
    }, delay - 9);
    return () => clearInterval(id);
  }, [delay]);
}

const PACKS = [
  {
    name: "The ChainSmokers",
    padLists: [
      {
        type: "loop",
        padItems: [
          {
            sampleName: "Drum1T",
            displayName: "Drum1T",
            instrument: "Drum",
            steps: 4,
          },
          {
            sampleName: "Drum1H",
            displayName: "Drum1H",
            instrument: "Drum",
            steps: 4,
          },
          {
            sampleName: "Drum1C",
            displayName: "Drum1C",
            instrument: "Drum",
            steps: 8,
          },
          {
            sampleName: "Drum1L",
            displayName: "Drum1L",
            instrument: "Drum",
            steps: 4,
          },
          {
            sampleName: "Piano1L",
            displayName: "Piano1L",
            instrument: "Piano",
            steps: 8,
          },
        ],
      },
      {
        type: "loop",
        padItems: [
          {
            sampleName: "HiHat1T",
            displayName: "HiHat1T",
            instrument: "HiHat",
            steps: 32,
          },
          {
            sampleName: "Synth1R",
            displayName: "Synth1R",
            instrument: "Synth",
            steps: 8,
          },
          {
            sampleName: "Synth1C",
            displayName: "Synth1C",
            instrument: "Synth",
            steps: 8,
          },
          {
            sampleName: "HiHat1C",
            displayName: "HiHat1C",
            instrument: "HiHat",
            steps: 8,
          },
          {
            sampleName: "HiHat1L",
            displayName: "HiHat1L",
            instrument: "HiHat",
            steps: 8,
          },
        ],
      },
      {
        type: "loop",
        padItems: [
          {
            sampleName: "Bass1T",
            displayName: "Bass1T",
            instrument: "Bass",
            steps: 16,
          },
          {
            sampleName: "Bass1H",
            displayName: "Bass1H",
            instrument: "Bass",
            steps: 8,
          },
          {
            sampleName: "Bass1C",
            displayName: "Bass1C",
            instrument: "Bass",
            steps: 32,
          },
          {
            sampleName: "Bass1L",
            displayName: "Bass1L",
            instrument: "Bass",
            steps: 8,
          },
          {
            sampleName: "Synth1L",
            displayName: "Synth1L",
            instrument: "Synth",
            steps: 16,
          },
        ],
      },
      {
        type: "loop",
        padItems: [
          {
            sampleName: "Chord1T",
            displayName: "Chord1T",
            instrument: "Chord",
            steps: 16,
          },
          {
            sampleName: "Melody1H",
            displayName: "Melody1H",
            instrument: "Melody",
            steps: 16,
          },
          {
            sampleName: "Chord1R",
            displayName: "Chord1R",
            instrument: "Chord",
            steps: 16,
          },
          {
            sampleName: "Chord2R",
            displayName: "Chord2R",
            instrument: "Chord",
            steps: 16,
          },
          {
            sampleName: "Chord1L",
            displayName: "Chord1L",
            instrument: "Chord",
            steps: 8,
          },
        ],
      },
      {
        type: "loop",
        padItems: [
          {
            sampleName: "Guitar1T",
            displayName: "Guitar1T",
            instrument: "Guitar",
            steps: 16,
          },
          {
            sampleName: "Guitar2T",
            displayName: "Guitar2T",
            instrument: "Guitar",
            steps: 8,
          },
          {
            sampleName: "Guitar1C",
            displayName: "Guitar1C",
            instrument: "Guitar",
            steps: 16,
          },
          {
            sampleName: "Guitar2C",
            displayName: "Guitar2C",
            instrument: "Guitar",
            steps: 16,
          },
          {
            sampleName: "Guitar1L",
            displayName: "Guitar1L",
            instrument: "Guitar",
            steps: 4,
          },
        ],
      },
      {
        type: "loop",
        padItems: [
          {
            sampleName: "Piano1T",
            displayName: "Piano1T",
            instrument: "Piano",
            steps: 8,
          },
          {
            sampleName: "Violin1T",
            displayName: "Violin1T",
            instrument: "Strings",
            steps: 8,
          },
          {
            sampleName: "Vocal1T",
            displayName: "Vocal1T",
            instrument: "Vocal",
            steps: 16,
          },
          {
            sampleName: "Vocal1R",
            displayName: "Vocal1R",
            instrument: "Vocal",
            steps: 16,
          },
          {
            sampleName: "Piano1C",
            displayName: "Piano1C",
            instrument: "Piano",
            steps: 16,
          },
        ],
      },
      {
        type: "shot",
        padItems: [
          {
            sampleName: "Siren1H",
            displayName: "Siren1H",
            instrument: "FX",
            steps: 4,
          },
          {
            sampleName: "Woo1R",
            displayName: "Woo1R",
            instrument: "FX",
            steps: 4,
          },
          {
            sampleName: "Woo2R",
            displayName: "Woo2R",
            instrument: "FX",
            steps: 2,
          },
          {
            sampleName: "Drum1T",
            displayName: "Drum",
            instrument: "Drum",
            steps: 4,
          },
          {
            sampleName: "Drum1T",
            displayName: "Drum",
            instrument: "Drum",
            steps: 4,
          },
        ],
      },
    ],
  },
  {
    name: "Jay Chou",
  },
  {
    name: "Trap",
  },
  {
    name: "Tropical House",
  },
];

const MusicScreen = ({ navigation }) => {
  const [time, setTime] = useState(1);
  const [bpm, setBpm] = useState(105);
  const [selectedBpm, setSelectedBpm] = useState(105);
  const [packIndex, setPackIndex] = useState(0);
  const [start, setStart] = useState(false);
  const modalizeRef = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "LaunchPad",
      headerLeft: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 70,
            marginLeft: 20,
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <Ionicons name="radio-button-on" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setStart(!start)}
          >
            {start ? (
              <Ionicons name="stop" size={24} color="white" />
            ) : (
              <Ionicons name="play" size={24} color="white" />
            )}
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 20,
          }}
        >
          <TouchableOpacity activeOpacity={0.5} onPress={handleModal}>
            <Ionicons name="ellipsis-horizontal" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, start]);

  useInterval(() => {
    if (start) {
      if (time == 16) {
        setTime(1);
        return;
      }

      setTime(time + 1);
    }
  }, (60 / bpm) * 1000);

  const handleModal = () => {
    modalizeRef.current?.open();
  };

  useEffect(() => {
    modalizeRef.current?.close();
  }, [packIndex]);

  const handleModalClose = () => {
    setBpm(selectedBpm);
  };

  return (
    <>
      <Portal>
        <Modalize
          ref={modalizeRef}
          modalHeight={480}
          modalStyle={{ backgroundColor: "#202020" }}
          handleStyle={{ backgroundColor: "#888888" }}
          onClose={handleModalClose}
        >
          <MuiscOption
            bpm={bpm}
            setSelectedBpm={setSelectedBpm}
            setPackIndex={setPackIndex}
          />
        </Modalize>
      </Portal>
      <View style={{ backgroundColor: "#111111" }}>
        <SafeAreaView style={{ backgroundColor: "#111111", height: "100%" }}>
          <StatusBar
            animated={true}
            backgroundColor="#61dafb"
            barStyle="light-content"
          />
          <View
            style={{
              height: "100%",
              backgroundColor: "#202020",
              paddingTop: 20,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              {`Pack: ${PACKS[packIndex].name}        BPM: ${bpm}`}
            </Text>
            {typeof PACKS[packIndex].padLists != "undefined" &&
              PACKS[packIndex]?.padLists.map((value, index) => (
                <PadList
                  key={index}
                  type={value.type}
                  padItems={value.padItems}
                  time={time}
                  status={start ? "play" : "stop"}
                  bpm={bpm}
                />
              ))}

            {/* <PadList
              type="loop"
              color="orange"
              time={time}
              instrument="HiHat"
              status={start ? "play" : "stop"}
              bpm={bpm}
              sampleName="HiHat1"
              steps={32}
            />
            <PadList
              type="loop"
              color="#5786CB"
              time={time}
              instrument="Bass"
              status={start ? "play" : "stop"}
              bpm={bpm}
              sampleName="Bass1"
              steps={16}
            />
            <PadList
              type="loop"
              color="#C151A2"
              time={time}
              instrument="Chord"
              status={start ? "play" : "stop"}
              bpm={bpm}
              sampleName="Chord1"
              steps={16}
            />
            <PadList
              type="loop"
              color="pink"
              time={time}
              instrument="Vocal"
              status={start ? "play" : "stop"}
              bpm={bpm}
              sampleName="Vocal1"
              steps={16}
            />
            <PadList
              type="loop"
              color="#6E49C9"
              time={time}
              instrument="Guitar"
              status={start ? "play" : "stop"}
              bpm={bpm}
              sampleName="Guitar1"
              steps={16}
            />
            <PadList
              type="loop"
              color="#71CEC3"
              time={time}
              instrument="Violin"
              status={start ? "play" : "stop"}
              bpm={bpm}
              sampleName="Violin1"
              steps={8}
            /> */}
          </View>
        </SafeAreaView>
      </View>
    </>
  );
};

export default MusicScreen;

const styles = StyleSheet.create({});
