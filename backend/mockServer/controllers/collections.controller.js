import Board from "../models/board.model.js";
import Pin from "../models/pin.model.js";

export const getUserCollections = async (req, res) => {

    try {
        const { userId } = req.params;

        const boards = await Board.find({ user: userId });
        const boardsWithPinDetails = await Promise.all(
            boards.map(async (board) => {
                try {
                    const [pinCount, firstPin] = await Promise.all([
                        Pin.countDocuments({ board: board._id }),
                        Pin.findOne({ board: board._id }).sort({ createdAt: 1 })
                    ]);

                    return {
                        ...board.toObject(),
                        pinCount,
                        firstPin,
                    };
                } catch (pinErr) {
                    return res.status(404).json({ message: 'Failed to Fetch Collections', code: 'BOARDS_NOT_FOUND' });
                }
            })
        );


        await new Promise((resolve) => setTimeout(resolve, 1000));

        return res.status(200).json(boardsWithPinDetails);
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", code: "INTERNAL_ERROR" });
    }
};