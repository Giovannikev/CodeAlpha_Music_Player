import bell_icon from './bell.png'
import home_icon from './home.png'
import like_icon from './like.png'
import loop_icon from './loop.png'
import mic_icon from './mic.png'
import next_icon from './next.png'
import play_icon from './play.png'
import pause_icon from './pause.png'
import plays_icon from './plays.png'
import prev_icon from './prev.png'
import search_icon from './search.png'
import shuffle_icon from './shuffle.png'
import speaker_icon from './speaker.png'
import stack_icon from './stack.png'
import zoom_icon from './zoom.png'
import plus_icon from './plus.png'
import arrow_icon from './arrow.png'
import mini_player_icon from './mini-player.png'
import queue_icon from './queue.png'
import volume_icon from './volume.png'
import arrow_right from './right_arrow.png'
import arrow_left from './left_arrow.png'
import spotify_logo from './spotify_logo.png'
import clock_icon from './clock_icon.png'
import img7 from './img7.jpg'
import img11 from './img11.jpg'
import img12 from './img12.jpg'
import img14 from './img14.jpg'
import img15 from './img15.jpg'
import img16 from './img16.jpg'
import song1 from './song1.mp3'
import song2 from './song2.mp3'
import song3 from './song3.mp3'
import chris from './chris.jpg'
import chris1 from './chris2.jpg'
import chris2 from './chris3.jpg'
import chris3 from './chris4.jpg'
import chris4 from './chris6.jpg'
import album1 from './album_cover1.jpg'
import album2 from './album_cover2.jpg'
import album3 from './album_cover3.jpg'
import chris_press_me from './Chris_Brown_-_Press_Me__Visualizer_(256k).mp3'
import chris_angels_number from './Chris_Brown_-_Angel_Numbers___Ten_Toes__Visualizer_(256k).mp3'
import chris_nightmares from './Chris_Brown_-_Nightmares__Official_Video__ft._Byron_Messia(256k).mp3'
import chris_shouldve_kissed_you from './Chris_Brown_-_Should_ve_Kissed_You__Official_Video_(256k).mp3'

export const assets = {
    bell_icon,
    home_icon,
    like_icon,
    loop_icon,
    mic_icon,
    next_icon,
    play_icon,
    plays_icon,
    prev_icon,
    search_icon,
    shuffle_icon,
    speaker_icon,
    stack_icon,
    zoom_icon,
    plus_icon,
    arrow_icon,
    mini_player_icon,
    volume_icon,
    queue_icon,
    pause_icon,
    arrow_left,
    arrow_right,
    spotify_logo,
    clock_icon
}

export const albumsData = [
    {
        id: 0,
        name: "11:11 deluxe",
        image: album1,
        description: "Your weekly update of the most played tracks",
        bgColor: "#2a4365",
        dateAdded: "12/04/24"
    },
    {
        id: 1,
        name: "X",
        image: album2,
        description: "Your weekly update of the most played tracks",
        bgColor: "#5594CC",
        dateAdded: "12/04/24"
    },
    {
        id: 2,
        name: "Breezy",
        image: album3,
        description: "Your weekly update of the most played tracks",
        bgColor: "#CCCCCC",
        dateAdded: "12/04/24"
    },
    {
        id: 3,
        name: "Trending Global",
        image: img16,
        description: "Your weekly update of the most played tracks",
        bgColor: "#44337a",
        dateAdded: "12/04/24"
    },
    {
        id: 4,
        name: "Mega Hits",
        image: img11,
        description: "Your weekly update of the most played tracks",
        bgColor: "#234e52",
        dateAdded: "12/04/24"
    },
    {
        id: 5,
        name: "Happy Favorites",
        image: img15,
        description: "Your weekly update of the most played tracks",
        bgColor: "#744210",
        dateAdded: "12/04/24"
    }
]

export const songsData = [
    {
        id: 0,
        name: "Chris Brown",
        title: "Press me",
        image: chris,
        file: chris_press_me,
        description: "Put a smile on your face with these happy tunes",
        duration: "3:00"
    },
    {
        id: 1,
        name: "Chris Brown",
        title: "Angels number",
        image: chris1,
        file: chris_angels_number,
        description: "Put a smile on your face with these happy tunes",
        duration: "2:20"
    },
    {
        id: 2,
        name: "Chris Brown",
        title: "Nightmares",
        image: chris2,
        file: chris_nightmares,
        description: "Put a smile on your face with these happy tunes",
        duration: "2:32"
    },
    {
        id: 3,
        name: "Chris Brown",
        image: chris3,
        title: "Should've kissed you",
        file: chris_shouldve_kissed_you,
        description: "Put a smile on your face with these happy tunes",
        duration: "2:50"
    },
    {
        id: 4,
        name: "Song Five",
        title: "Title",
        image: chris4,
        file: song2,
        description: "Put a smile on your face with these happy tunes",
        duration: "3:10"
    },
    {
        id: 5,
        name: "Song Six",
        title: "Title",
        image: img14,
        file: song3,
        description: "Put a smile on your face with these happy tunes",
        duration: "2:45"
    },
    {
        id: 6,
        name: "Song Seven",
        title: "Title",
        image: img7,
        file: song1,
        description: "Put a smile on your face with these happy tunes",
        duration: "2:18"
    },
    {
        id: 7,
        name: "Song Eight",
        title: "Title",
        image: img12,
        file: song2,
        description: "Put a smile on your face with these happy tunes",
        duration: "2:35"
    }
]