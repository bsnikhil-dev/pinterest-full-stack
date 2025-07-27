import Pin from "../models/pin.model.js";

export const getPins = async (req, res) => {

    try {

        const search = req.query.query;

        const pins = await Pin.find(search ? {
            $or: [
                { title: { $regex: search, $options: "i" } },
                { tags: { $in: [search] } },
            ],
        } : {}).limit(5);

        // await new Promise((resolve) => setTimeout(resolve, 5000));
        res.status(200).json(pins);

    } catch (error) {
        if (error.message === 'No pins found') {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Server error. Please try again later.' });
        }
    }
};

export const getPin = async (req, res) => {
    const { id } = req.params;
    const pin = await Pin.findById(id).populate(
        "user",
        "username img displayName"
    );
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    res.status(200).json([pin]);
};

