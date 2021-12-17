import { Box, Flex } from "reflexbox"
import { PrimaryText } from "../../components/Typography"
const moment= require('moment') 



const ChatItem = ({ name, message, timestamp, urls, sent }) => {

    const imagePresent = (urls) ? true : false

    const style = {borderRadius: 16, padding:8, width:260, marginRight:16, marginLeft:16,backgroundColor: sent ? "#f7e1e1" : "#baf5d4", alignSelf: sent? 'end' : 'start'}

    const timestampString = getTimestampString(timestamp)

    return (
        
        <Flex width={1} flexDirection="column" marginBottom= {2} >
            <Box style={style}>
            <PrimaryText size={11} >
                {name}
            </PrimaryText>

            {imagePresent && <img src={urls.replace(/['"]+/g, '')}  style={{height: 160, width:160, marginTop: 8, marginLeft: 8}} />}

            <PrimaryText size={15} style={{fontWeight: 'bold', flexGrow:1}}>
                {message}
            </PrimaryText>

            <PrimaryText size={9} style={{marginLeft:190}} >
                {timestampString}
            </PrimaryText>
            </Box>

        </Flex>
    )


}

function getTimestampString(timestamp) {
    if (timestamp) {
        var t = new Date(timestamp );
        return moment(t).format('LT');
    }
    return ""
}



export default ChatItem