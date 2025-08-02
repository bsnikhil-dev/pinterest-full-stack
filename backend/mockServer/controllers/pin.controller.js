import Pin from "../models/pin.model.js";

export const getPins = async (req, res) => {

    try {

        const search = req.query.query;
        const userId = req.query.userId;
        const collectionId = req.query.collectionId;

        const pins = await Pin.find(search ? {
            $or: [
                { title: { $regex: search, $options: "i" } },
                { tags: { $in: [search] } },
            ],
        } : userId
            ? { user: userId }
            : collectionId
                ? { board: collectionId }
                : {});

        await new Promise((resolve) => setTimeout(resolve, 3000));
        return res.status(200).json(pins);

    } catch (error) {
        if (error.message === 'No pins found') {
            return res.status(404).json({ message: error.message });
        } else {
            return res.status(500).json({ message: 'Internal Server error' });
        }
    }
};

export const getPin = async (req, res) => {
    try {
        const { id } = req.params;

        const pin = await Pin.findById(id).populate(
            "user",
            "username img displayName"
        );

        await new Promise((resolve) => setTimeout(resolve, 3000));
        const { user, media } = pin;
        const reponseData = {
            media,
            user
        }
        return res.status(200).json([reponseData]);

    } catch (error) {
        return res.status(500).json({ message: "Internal Server error" });
    }

};

