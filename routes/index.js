module.exports = {
    getHomePage: (req, res) => {
        
        query = " SELECT * from comentary";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('smarkio.ejs', {
                title: 'Welcome to Socka | View Players',
                comentaries: result
            
            });
        });
        
    },
    getComentaries: (req, res) => {
        query = " SELECT * from comentary";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.send(result);
            
            });
        },
    getComentariesById: (req, res) => {
        const id = req.params.id;
        query = " SELECT * from comentary WHERE id = " + id;
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.send(result);
            
        });


    },
    addComentary: (req, res) => {
        console.log("Comentário Adicionado ao banco");


        let message = '';
        let comentary = req.body.comentary;

          
        // send the player's details to the database
        let query = "INSERT INTO `comentary` (comentary) VALUES ('" +
            comentary + "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
                    
                 
            
    },
    getSound: (req, res) => {
        const id = req.params.id;
        query = " SELECT * from comentary WHERE id = " + id;
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            var comentaryToSound = result[0].comentary;

        

            var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
            var fs = require('fs');

            var textToSpeech = new TextToSpeechV1({
                apikey: "8dqWEngmo_VVmCxJqmohHPr8L1H3fO6MOYBEwrPw9OY1",
                iam_apikey_description: "Auto generated apikey during resource-key operation for Instance - crn:v1:bluemix:public:text-to-speech:us-south:a/340d91776cbd409f90be345cc2f15202:d75b616a-8863-4fb9-a48c-290744694618::",
                iam_apikey_name: "auto-generated-apikey-ddacddb1-eb67-4aee-bb43-63f2f68489bf",
                iam_role_crn: "crn:v1:bluemix:public:iam::::serviceRole:Manager",
                iam_serviceid_crn: "crn:v1:bluemix:public:iam-identity::a/340d91776cbd409f90be345cc2f15202::serviceid:ServiceId-1ea26dab-64b5-4bcc-93a5-7688a0cca72f",
                url: "https://stream.watsonplatform.net/text-to-speech/api"
            });

            var params = {
              text: comentaryToSound,
              voice: 'en-US_AllisonVoice', // Optional voice
              accept: 'audio/wav'
            };

            // Synthesize speech, correct the wav header, then save to disk
            // (wav header requires a file length, but this is unknown until after the header is already generated and sent)
            textToSpeech
              .synthesize(params, function(err, audio) {
                if (err) {
                  console.log(err);
                  return;
                }
                textToSpeech.repairWavHeader(audio);
                fs.writeFileSync('audio.wav', audio);
                console.log('audio.wav written with a corrected wav header');
            });

        });
            
        
    },
};
