import React from "react"
import frflag from "../assets/frflag.png"
import spflag from "../assets/spflag.png"
import jpnflag from "../assets/jpnflag.png"
import OpenAI from "openai"

export default function Chat() {
    // STATE //
    const [formData, setFormData] = React.useState({
        translateText: "",
        language: "",
        translationResult: "",
    })
    const [resetForm, setResetForm] = React.useState(false)
    const [isTranslating, setIsTranslating] = React.useState(false)
    const [error, setError] = React.useState("")
    
    React.useEffect(() => {
      console.log(formData);
    }, [formData.translationResult]);
    
    
    // STATE Change Functions//
    function translationStateChange() {
        setFormData(prevFormData => ({
            ...prevFormData,
            translationResult: "",
        }))
        setResetForm(prevResetForm => !prevResetForm)
    }
    
    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
        if (error && value.trim() !== "") setError("")
    }
    
    //OPEN AI Function//
    async function aiFetchRequest() {
        if (!formData.translateText.trim()) {
            return
        }
        
        setIsTranslating(true)
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
            dangerouslyAllowBrowser: true
        })
        
        const message = [{
            role: "system",
            content: "You are a multi-lingual expert that can translate english, japanese, spanish and french. You are going to translate from english to one of the three other languages and provide the user with the most accurate answer possible.",},
        {
            role: "user",
            content: `Translate this text: ${formData.translateText}, in ${formData.language}.`},
        ] 
        
        const response = await openai.chat.completions.create({
            model: "gpt-4-0125-preview",
            messages: message,
            temperature: 1,
            presence_penalty: 0,
            frequency_penalty: 0,
        })
        
        const translation = response.choices[0].message.content
        setFormData(prevFormData => ({
            ...prevFormData,
            translationResult: translation,
        }))
        setIsTranslating(false)
    }
        
    
    // Form Submit Function //
    function handleSubmit(event) {
        event.preventDefault()
        if (!resetForm) { aiFetchRequest() }
        if (!formData.translateText.trim()) {
            setError("Enter some text to translate.")
            return
        }
        translationStateChange()
    }
    // JSX //
    return (
        <div className="translate-container">            
            <form onSubmit={handleSubmit}>
                <legend className="form-title">Text to translate 👇 </legend>
                <textarea
                    value= {formData.translateText}
                    placeholder= "How are you?"
                    onChange= {handleChange}
                    name= "translateText"
                    disabled={isTranslating || resetForm}
 
                />
                <br />

            <legend className="form-title">
                {!resetForm ? "Select language 👇" : "Your translation 👇"} 
            </legend>
            
            {resetForm ?  (
                <>
                <textarea 
                    value= {formData.translationResult}
                    onChange= {handleChange}
                    disabled={true}
                />  
                <br />
                </>)
                
                : (
                <>
                <input 
                    type="radio"
                    id="french"
                    name="language"
                    value="french"
                    checked= {formData.language === "french"}
                    onChange= {handleChange}
                />
                 <label className="select-language" htmlFor="french"> 
                     French 
                    <img className="flags" src={frflag} alt="French Flag" /> 
                </label>
                <br /> 
                
                <input 
                    type="radio"
                    id="spanish"
                    name="language"
                    value="spanish"
                    checked= {formData.language === "spanish"}
                    onChange= {handleChange}
                />
                <label className="select-language" htmlFor="spanish"> 
                    Spanish 
                    <img className="flags" src={spflag} alt="Spanish Flag" /> 
                </label>
                <br />   
                
                <input 
                    type="radio"
                    id="japanese"
                    name="language"
                    value="japanese"
                    checked= {formData.language === "japanese"}
                    onChange= {handleChange}
                />
                <label className="select-language" htmlFor="japanese">  
                    Japanese
                    <img className="flags" src={jpnflag} alt="Japan Flag" /> 
                </label>
                <br />
                    
                </>
                )}
                
                {error && <p className="error-message">{error}</p>}
                <button className="submit-btn" disabled={isTranslating || resetForm}> 
                    {resetForm ? "Start Over" : "Translate"} 
                </button>
            </form>
        </div>
    )
}