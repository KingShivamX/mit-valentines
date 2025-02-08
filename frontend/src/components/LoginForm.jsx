import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const LoginForm = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        try {
            const response = await fetch(
                "https://mit-valentines.onrender.com/user/login",
                // "http://localhost:3000/user/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            )

            const data = await response.json()

            if (data.status !== 200) {
                throw new Error(data.message || "Login failed")
            }

            // Store both userId and token in localStorage
            // localStorage.setItem("userId", data.userId)
            localStorage.setItem("token", data.token)
            localStorage.setItem("user", JSON.stringify(data.user))

            console.log("Logged in successfully")

            // Redirect to home page after successful login
            navigate("/")
        } catch (error) {
            setError(error.message || "An error occurred during login")
            console.error("Login error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section
            id="login"
            className="py-16 bg-gradient-to-br from-pink-100 to-purple-100 min-h-screen flex items-center"
        >
            <div className="container mx-auto px-4">
                <div className="max-w-md mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all hover:scale-[1.02]">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                Welcome Darling! ❤️
                            </h2>
                            <p className="text-gray-600">
                                Sign in to find your valentine
                            </p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 rounded-lg">
                                <p className="text-red-600 text-sm">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Username
                                </label>
                                <input
                                    type="username"
                                    name="username"
                                    id="username"
                                    value={formData.username}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                                    placeholder="Enter your username"
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={formData.password}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
                                    placeholder="Enter your password"
                                    onChange={handleChange}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium 
                                ${
                                    !isLoading
                                        ? "hover:from-pink-600 hover:to-purple-700 hover:-translate-y-0.5"
                                        : "opacity-75 cursor-not-allowed"
                                }
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transform transition-all`}
                            >
                                {isLoading ? "Signing In..." : "Sign In"}
                            </button>

                            <div className="text-center mt-4">
                                <p className="text-sm text-gray-600">
                                    Check Your Email for login credentials
                                </p>
                            </div>
                        </form>

                        <div className="mt-8 text-center">
                            <button
                                onClick={() => navigate('/')}
                                className="px-6 py-2.5 text-pink-500 text-sm font-medium
                                border border-pink-200 rounded-full transition-all duration-300
                                hover:bg-pink-50 hover:border-pink-300 hover:text-pink-600
                                active:scale-[0.98]"
                            >
                                Go to Home 💝
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginForm
