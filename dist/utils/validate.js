"use strict";
function validate(name, email, password) {
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (name.length < 2) {
        return res
            .status(400)
            .json({ message: "Name must be at least 2 characters" });
    }
    const validEmail = email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    if (!validEmail) {
        return res.status(400).json({ message: "Invalid email" });
    }
    const user = yield User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }
    if (password.length < 6) {
        return res
            .status(400)
            .json({ message: "Password must be at least 6 characters" });
    }
}
