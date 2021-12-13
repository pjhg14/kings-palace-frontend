import { createConsumer } from "@rails/actioncable";
import { socket } from "./urls";

const consumer = createConsumer(socket)

export default consumer