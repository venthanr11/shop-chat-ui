import { Flex } from "reflexbox"
import { PrimaryText } from "../../components/Typography"

const ChatItem = ({ name, message, timestamp, urls }) => {

    const imagePresent = urls && urls.size > 0

    return (
        <Flex width={1} flexDirection="row">
            <PrimaryText size={12} weight={500}>
                {name}
            </PrimaryText>

            {imagePresent &&  <img src={urls[0]}  style={{height: 160, width:160}} />}

            <PrimaryText size={16} weight={500}>
                {message}
            </PrimaryText>

            <PrimaryText size={10} weight={500}>
                {timestamp}
            </PrimaryText>

        </Flex>
    )

}

export default ChatItem