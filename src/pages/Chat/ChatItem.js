import { Box, Flex } from "reflexbox"
import { PrimaryText } from "../../components/Typography"
const moment= require('moment') 



const ChatItem = ({ name, message, timestamp, urls, sent }) => {


    const style = {borderRadius: 32, padding:12, width:260, marginRight:16, marginLeft:16,backgroundColor: sent ? "#4f90db" : "#eeeded", alignSelf: sent? 'end' : 'start'}

    const textColor = sent ? "#ffffff" : "#000000"
    const timestampString = getTimestampString(timestamp)

    return (
        
        <Flex width={1} flexDirection="column" marginBottom= {2} >
            <Box style={style}>
            {urls && urls.map((url) => {
                 return <img src={url.replace(/[\[\]']+/g, '')}  style={{alignSelf: 'baseline', maxWidth:220, marginTop: 12, marginLeft: 16}}/> })
                 }

            <PrimaryText size={16} style={{ flexGrow:1, color:textColor, marginLeft: 12, marginTop:4}}>
                {message}
            </PrimaryText>

            <PrimaryText size={9} style={{marginLeft:190, color:textColor,}}>
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