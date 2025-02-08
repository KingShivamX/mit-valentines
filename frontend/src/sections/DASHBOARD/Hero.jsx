import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import Lottie from "lottie-react"
import loveAnimation from "/public/love.json"
import { useNavigate } from "react-router-dom"
import HobbiesForm from "../../components/HobbiesForm/HobbiesForm"

const scrollToHobbiesForm = () => {
    const hobbiesForm = document.getElementById("hobbies-section")
    if (hobbiesForm) {
        hobbiesForm.scrollIntoView({ behavior: "smooth" })
    }
}

const TimeUnit = ({ value, label }) => (
    <div
        className="bg-white/30 p-6 rounded-xl min-w-[140px] flex flex-col items-center 
    transform transition-all duration-300 hover:-translate-y-1 hover:scale-105
    border border-white/40 shadow-lg backdrop-blur-sm"
    >
        <span className="text-4xl font-bold tabular-nums">
            {value.toString().padStart(2, "0")}
        </span>
        <div className="text-sm mt-2 font-medium text-white/90">{label}</div>
    </div>
)

TimeUnit.propTypes = {
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
}

const Hero = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    const calculateTimeLeft = () => {
        const targetDate = new Date("2025-02-14T00:00:00").getTime()
        const now = new Date().getTime()
        const difference = targetDate - now

        if (difference > 0) {
            setTimeLeft({
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor(
                    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                ),
                minutes: Math.floor(
                    (difference % (1000 * 60 * 60)) / (1000 * 60)
                ),
                seconds: Math.floor((difference % (1000 * 60)) / 1000),
            })
        } else {
            setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        }
    }

    useEffect(() => {
        calculateTimeLeft()
        const timer = setInterval(calculateTimeLeft, 1000)
        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        checkLoginStatus()
    }, [])

    const checkLoginStatus = async () => {
        const token = localStorage.getItem("token")
        if (!token) return

        try {
            const response = await fetch(
                "https://mit-valentines.onrender.com/user/get-profile",
                {
                    headers: {
                        "Content-type": "application/json",
                        token: token,
                    },
                }
            )

            const data = await response.json()
            if (data.status == 200) {
                setUser(data.user)
                console.log(data.user)
            }
        } catch (error) {
            console.error("Error fetching user:", error)

            localStorage.removeItem("token")
            localStorage.removeItem("userId")
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token")
        setUser(null)
        navigate("/login")
    }

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-pink-400 via-pink-500 to-purple-600 flex flex-col">
            {/* Auth Button with improved styling */}
            <div className="pt-4 px-4 z-50 items-end flex justify-end">
                {user ? (
                    <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl border border-white/20">
                        <span className="text-white font-medium">
                            Hi, {user.name} 👋
                        </span>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-white/10 text-white rounded-lg 
                            hover:bg-white/20 transition-all duration-300 border border-white/20"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => navigate("/login")}
                        className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20
                        text-white rounded-xl shadow-lg hover:bg-white/20 transition-all duration-300
                        font-medium flex items-center gap-2 group"
                    >
                        <span>Login</span>
                        <span className="group-hover:rotate-12 transition-transform duration-300">
                            💝
                        </span>
                    </button>
                )}
            </div>

            <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-pink-400 via-pink-500 to-purple-600 relative overflow-hidden">
                {/* Lottie Animation */}
                <div className="absolute w-full h-full top-0 left-0 pointer-events-none">
                    <Lottie
                        animationData={loveAnimation}
                        loop={true}
                        style={{ width: "100%", height: "100%", opacity: 0.6 }}
                    />
                </div>

                <div className="text-center text-white z-10 p-8 max-w-7xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-bold mb-8 drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-100">
                        MIT-AoE Valentine&apos;s Day 💕
                    </h1>
                    <p className="text-2xl md:text-3xl mb-8 text-white/90">
                        Your Valentine Awaits... Ready to Match?
                    </p>

                    <div className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-lg animate-pulse-slow ring-1 ring-white/50">
                        <p className="text-2xl font-semibold mb-6">
                            Valentine&apos;s Match Reveal in: ⏳
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <TimeUnit value={timeLeft.days} label="Days" />
                            <TimeUnit value={timeLeft.hours} label="Hours" />
                            <TimeUnit
                                value={timeLeft.minutes}
                                label="Minutes"
                            />
                            <TimeUnit
                                value={timeLeft.seconds}
                                label="Seconds"
                            />
                        </div>
                    </div>

                    <button
                        className="mt-8 px-8 py-4 text-2xl bg-white text-pink-500 rounded-full 
              shadow-lg transform transition-all duration-300 hover:-translate-y-1 
              hover:shadow-xl active:translate-y-0 focus:outline-none focus:ring-2 
              focus:ring-white focus:ring-offset-2 focus:ring-offset-pink-500"
                        onClick={() => scrollToHobbiesForm()}
                    >
                        💘 Get Matched Now!
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Hero
