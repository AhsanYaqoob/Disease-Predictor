import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import '../styles/Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState([{ type: 'bot', text: 'Hi, how can I help you?' }]);
  const [isThinking, setIsThinking] = useState(false);

  const qaData = [
    
  { question: "What is liver disease?", answer: "Liver disease refers to any condition that damages the liver and affects its function." },
  { question: "What are symptoms of liver disease?", answer: "Symptoms include fatigue, jaundice, nausea, and abdominal swelling." },
  { question: "How can I prevent liver disease?", answer: "Avoid excessive alcohol, get vaccinated, and maintain a healthy diet." },
  { question: "What causes liver disease?", answer: "Causes include infections, genetics, alcohol use, and obesity." },
  { question: "Is liver disease hereditary?", answer: "Some types of liver disease, like hemochromatosis and Wilson's disease, are hereditary." },
  { question: "Can liver disease be cured?", answer: "It depends on the type and stage. Early stages can be managed or reversed." },
  { question: "What is cirrhosis?", answer: "Cirrhosis is scarring of the liver caused by long-term liver damage." },
  { question: "Can liver disease cause jaundice?", answer: "Yes, liver disease can cause yellowing of the skin and eyes, known as jaundice." },
  { question: "What is fatty liver disease?", answer: "Fatty liver disease occurs when fat builds up in liver cells." },
  { question: "Is fatty liver reversible?", answer: "Yes, lifestyle changes like weight loss and healthy eating can reverse it." },
  { question: "What is hepatitis?", answer: "Hepatitis is inflammation of the liver caused by viruses or toxins." },
  { question: "What are the types of hepatitis?", answer: "The main types are hepatitis A, B, C, D, and E." },
  { question: "Can hepatitis be prevented?", answer: "Hepatitis A and B can be prevented through vaccines." },
  { question: "What foods are good for the liver?", answer: "Leafy greens, berries, nuts, fish, and coffee are considered liver-friendly." },
  { question: "Is alcohol harmful to the liver?", answer: "Excessive alcohol consumption is one of the leading causes of liver disease." },
  { question: "How is liver disease diagnosed?", answer: "Through blood tests, imaging (ultrasound, CT, MRI), and liver biopsy." },
  { question: "What is a liver function test?", answer: "It's a blood test that measures liver enzymes and proteins to assess liver health." },
  { question: "What is liver fibrosis?", answer: "It’s the buildup of scar tissue in the liver due to damage." },
  { question: "Can liver disease lead to cancer?", answer: "Yes, long-term liver disease can lead to liver cancer." },
  { question: "Is liver transplant the only cure?", answer: "For end-stage liver disease, liver transplant is often the only option." },
  { question: "How long can someone live with liver disease?", answer: "It varies depending on the type and stage. Early detection improves outcomes." },
  { question: "Can liver disease cause weight loss?", answer: "Yes, unintended weight loss can be a symptom." },
  { question: "Does liver disease affect digestion?", answer: "Yes, it can cause nausea, vomiting, and loss of appetite." },
  { question: "Can children get liver disease?", answer: "Yes, liver disease can affect individuals of all ages." },
  { question: "Is liver disease contagious?", answer: "Only infectious causes like hepatitis viruses are contagious." },
  { question: "What is autoimmune hepatitis?", answer: "It’s a condition where the immune system attacks liver cells." },
  { question: "Can medications cause liver damage?", answer: "Yes, certain medications and supplements can be toxic to the liver." },
  { question: "What is liver detox?", answer: "It refers to dietary or lifestyle approaches to support liver function, though medically unnecessary for most people." },
  { question: "Does exercise help with liver disease?", answer: "Yes, regular exercise can help reduce fat in the liver and improve health." },
  { question: "Can you live without a liver?", answer: "No, the liver is essential for survival." },
  { question: "What is liver failure?", answer: "It’s a life-threatening condition where the liver loses its ability to function properly." },
  { question: "What is the role of the liver in digestion?", answer: "It produces bile to help digest fats and processes nutrients." },
  { question: "Can obesity lead to liver disease?", answer: "Yes, obesity increases the risk of fatty liver disease." },
  { question: "What is NASH?", answer: "Non-alcoholic steatohepatitis (NASH) is a more severe form of fatty liver disease." },
  { question: "Can supplements help liver health?", answer: "Some may help, but always consult a doctor before using supplements." },
  { question: "Is liver disease common?", answer: "Yes, especially fatty liver disease, which is increasing globally." },
  { question: "What is hepatic encephalopathy?", answer: "It's a decline in brain function due to liver's inability to remove toxins from the blood." },
  { question: "Can liver disease cause confusion?", answer: "Yes, especially in advanced stages due to toxin buildup." },
  { question: "Are there stages of liver disease?", answer: "Yes, from inflammation to fibrosis, cirrhosis, and liver failure." },
  { question: "What is the main cause of liver transplants?", answer: "Chronic hepatitis and cirrhosis are leading causes." },
  { question: "What is liver regeneration?", answer: "The liver can repair itself by regenerating damaged tissue." },
  { question: "How much of the liver is needed to survive?", answer: "Only about 25-30% is needed for survival." },
  { question: "What is bile?", answer: "A fluid made by the liver to help digest fats." },
  { question: "Can stress cause liver disease?", answer: "Stress itself doesn't cause it, but can worsen other conditions." },
  { question: "What are liver cysts?", answer: "Fluid-filled sacs in the liver, usually benign." },
  { question: "What is a liver hemangioma?", answer: "A benign tumor made of blood vessels in the liver." },
  { question: "Is coffee good for liver?", answer: "Yes, moderate coffee consumption is linked to lower liver disease risk." },
  { question: "What is Gilbert’s syndrome?", answer: "A mild liver condition that affects bilirubin processing." },
  { question: "Can liver disease be asymptomatic?", answer: "Yes, especially in early stages." },
  { question: "Is liver disease painful?", answer: "It can cause discomfort or pain in the upper right abdomen." },
  { question: "Can pets get liver disease?", answer: "Yes, animals can also suffer from liver issues." },
  { question: "What are liver enzymes?", answer: "Proteins that speed up chemical reactions in the liver." },
  { question: "What is ALT?", answer: "Alanine transaminase, an enzyme elevated in liver damage." },
  { question: "What is AST?", answer: "Aspartate transaminase, another liver enzyme checked in blood tests." },
  { question: "Can liver disease cause itchy skin?", answer: "Yes, especially in cholestatic liver disease." },
  { question: "Is yellow urine a sign of liver disease?", answer: "It can be, due to high bilirubin levels." },
  { question: "What is liver stent?", answer: "A tube placed to keep bile ducts open when blocked." },
  { question: "What is liver biopsy?", answer: "A procedure to remove a small liver sample for examination." },
  { question: "Can I donate part of my liver?", answer: "Yes, the liver regenerates after partial donation." },
  { question: "What is portal hypertension?", answer: "High blood pressure in the portal vein due to liver damage." },
  { question: "Can liver disease cause nosebleeds?", answer: "Yes, due to clotting problems and low platelet count." },
  { question: "What is a liver transplant?", answer: "Surgical replacement of a diseased liver with a healthy one." },
  { question: "What are complications of liver disease?", answer: "Cirrhosis, liver cancer, bleeding, and brain dysfunction." },
  { question: "Can smoking affect liver health?", answer: "Yes, it can worsen liver disease and increase cancer risk." },
  { question: "What is the MELD score?", answer: "Model for End-Stage Liver Disease, used to assess liver transplant need." },
  { question: "Can liver disease cause leg swelling?", answer: "Yes, due to fluid retention and poor circulation." },
  { question: "What is hepatic steatosis?", answer: "Medical term for fatty liver." },
  { question: "How is liver disease treated?", answer: "Lifestyle changes, medications, and sometimes surgery." },
  { question: "What is the best diet for liver disease?", answer: "Low-fat, high-fiber diet with limited salt and sugar." },
  { question: "Can antibiotics affect the liver?", answer: "Yes, some antibiotics can be toxic to the liver." },
  { question: "What is liver detox juice?", answer: "Juices made with liver-friendly ingredients like beets and lemon." },
  { question: "Are liver cleanses safe?", answer: "Most are not backed by science and may be risky." },
  { question: "Can you feel your liver?", answer: "Normally no, but an enlarged liver may be felt under the right rib." },
  { question: "What is hepatomegaly?", answer: "An enlarged liver, often a sign of disease." },
  { question: "Does liver disease cause bad breath?", answer: "Yes, a symptom called fetor hepaticus." },
  { question: "Can liver disease cause dark stools?", answer: "Yes, due to bleeding or bile obstruction." },
  { question: "What is cholestasis?", answer: "A condition where bile flow from the liver is reduced or blocked." },
  { question: "What are bile ducts?", answer: "Tubes that carry bile from the liver to the small intestine." },
  { question: "Can liver disease affect cholesterol?", answer: "Yes, the liver plays a key role in cholesterol metabolism." },
  { question: "What is primary biliary cholangitis?", answer: "A chronic disease where bile ducts are slowly destroyed." },
  { question: "What is liver congestion?", answer: "Blood buildup in the liver, often due to heart failure." },
  { question: "What is the function of albumin?", answer: "A protein made by the liver that helps maintain blood volume." },
  { question: "What is liver shunt?", answer: "An abnormal blood flow bypassing the liver, common in pets." },
  { question: "What is the liver's role in detoxification?", answer: "It filters and breaks down harmful substances in the blood." },
  { question: "Can poor sleep affect the liver?", answer: "Indirectly, poor sleep can affect overall health, including the liver." },
  { question: "What is Wilson’s disease?", answer: "A genetic disorder where copper builds up in the liver." },
  { question: "What is hemochromatosis?", answer: "A disorder causing iron overload in the body, affecting the liver." },
  { question: "What is the liver's role in glucose regulation?", answer: "It stores and releases glucose as needed for energy." },
  { question: "Can liver disease affect hormones?", answer: "Yes, it can disrupt hormone balance in the body." },
  { question: "Does liver disease affect fertility?", answer: "Yes, especially in severe cases." },
  { question: "Can liver disease be detected by urine test?", answer: "Urine may show bilirubin or other signs, but blood tests are more accurate." },
  { question: "What is the liver's role in protein synthesis?", answer: "It produces most of the proteins found in blood plasma." },

  { question: "What is lung cancer?", answer: "Lung cancer is a disease where abnormal cells grow uncontrollably in the lung tissues." },
  { question: "What causes lung cancer?", answer: "Primary causes include smoking, secondhand smoke, radon gas, asbestos, and air pollution." },
  { question: "What are the symptoms of lung cancer?", answer: "Symptoms may include coughing, chest pain, shortness of breath, and weight loss." },
  { question: "Is lung cancer curable?", answer: "Lung cancer can be cured if detected early and treated promptly." },
  { question: "What are the types of lung cancer?", answer: "The main types are small-cell lung cancer (SCLC) and non-small-cell lung cancer (NSCLC)." },
  { question: "Can non-smokers get lung cancer?", answer: "Yes, environmental factors and genetics can cause lung cancer in non-smokers." },
  { question: "How is lung cancer diagnosed?", answer: "Diagnosis involves imaging tests, biopsy, sputum cytology, and blood tests." },
  { question: "What is staging in lung cancer?", answer: "Staging determines how far the cancer has spread in the body." },
  { question: "What is stage 4 lung cancer?", answer: "Stage 4 is advanced lung cancer that has spread to other organs." },
  { question: "Can lung cancer spread to the brain?", answer: "Yes, metastasis to the brain is possible in advanced stages." },
  { question: "What is a lung nodule?", answer: "A lung nodule is a small abnormal growth in the lung that can be benign or cancerous." },
  { question: "Is coughing blood a sign of lung cancer?", answer: "Yes, hemoptysis is a potential symptom of lung cancer." },
  { question: "Can CT scans detect lung cancer?", answer: "Yes, low-dose CT scans are commonly used for screening." },
  { question: "Is lung cancer painful?", answer: "Pain can occur in advanced stages due to tumor growth and pressure." },
  { question: "Can lung cancer be detected early?", answer: "Yes, especially in high-risk groups through screening programs." },
  { question: "Is chemotherapy effective for lung cancer?", answer: "Yes, especially in combination with other treatments." },
  { question: "What is immunotherapy for lung cancer?", answer: "It boosts the immune system to fight cancer cells." },
  { question: "What is targeted therapy?", answer: "Targeted therapy attacks specific cancer cell genes or proteins." },
  { question: "Can lung cancer be inherited?", answer: "A family history increases risk, but most cases aren't inherited." },
  { question: "What are the risk factors for lung cancer?", answer: "Smoking, exposure to radon, asbestos, and air pollution." },
  { question: "What is small-cell lung cancer?", answer: "A fast-growing cancer that often spreads quickly." },
  { question: "What is non-small-cell lung cancer?", answer: "A more common and slower-growing form of lung cancer." },
  { question: "Can you live a normal life after lung cancer?", answer: "Yes, especially if diagnosed early and treated effectively." },
  { question: "What is palliative care for lung cancer?", answer: "It focuses on relieving symptoms and improving quality of life." },
  { question: "How is lung cancer treated?", answer: "Treatment options include surgery, chemotherapy, radiation, and immunotherapy." },
  { question: "What is the prognosis for lung cancer?", answer: "Prognosis depends on the stage, type, and response to treatment." },
  { question: "Can lung cancer cause back pain?", answer: "Yes, if the cancer spreads to bones or nerves." },
  { question: "What is a PET scan?", answer: "A PET scan shows how tissues and organs are functioning and detects cancer spread." },
  { question: "Can air pollution cause lung cancer?", answer: "Yes, long-term exposure increases risk." },
  { question: "Is lung cancer common?", answer: "It is one of the most common and deadly cancers worldwide." },
  { question: "What is the survival rate of lung cancer?", answer: "Varies by stage; early-stage has higher survival rates." },
  { question: "Can lung cancer cause hoarseness?", answer: "Yes, due to pressure on the vocal cords or nerve damage." },
  { question: "Is surgery an option for lung cancer?", answer: "Yes, especially for early-stage non-small-cell lung cancer." },
  { question: "How long is chemotherapy for lung cancer?", answer: "Typically given in cycles over several months." },
  { question: "What are lung cancer screening guidelines?", answer: "High-risk adults aged 50–80 with a smoking history may need yearly low-dose CT scans." },
  { question: "Can lung cancer return after treatment?", answer: "Yes, recurrence is possible and requires monitoring." },
  { question: "Can diet affect lung cancer recovery?", answer: "Yes, a balanced diet supports immune health and healing." },
  { question: "Is there a vaccine for lung cancer?", answer: "Not yet, but research is ongoing." },
  { question: "Can exercise help lung cancer patients?", answer: "Yes, it can improve stamina and mental well-being." },
  { question: "What is a thoracotomy?", answer: "A surgical procedure to access the chest for lung surgery." },
  { question: "What is pleural effusion?", answer: "Fluid buildup between the layers of tissue around the lungs." },
  { question: "Can lung cancer be detected in a blood test?", answer: "Some markers can help, but imaging is more reliable." },
  { question: "What is EGFR in lung cancer?", answer: "A gene mutation that can be targeted with specific drugs." },
  { question: "How long can you live with lung cancer?", answer: "It varies greatly depending on the type and stage." },
  { question: "Can lung cancer affect breathing?", answer: "Yes, tumors can obstruct airways and reduce lung function." },
  { question: "What is bronchogenic carcinoma?", answer: "Another term for lung cancer originating in the bronchi." },
  { question: "Are there clinical trials for lung cancer?", answer: "Yes, many ongoing trials test new treatments." },
  { question: "Can smoking e-cigarettes cause lung cancer?", answer: "The long-term effects are unknown, but they may pose risks." },
  { question: "What is a biopsy?", answer: "A procedure to remove tissue for examination under a microscope." },
  { question: "How often should I get screened for lung cancer?", answer: "Annually, if you're in a high-risk group." },
  { question: "What is the role of genetics in lung cancer?", answer: "Some gene mutations increase the risk of developing lung cancer." },
  { question: "Can lung cancer be misdiagnosed?", answer: "Yes, especially in early stages when symptoms are vague." },
  { question: "Is lung cancer more common in men or women?", answer: "Historically men, but rates in women are rising." },
  { question: "Can radiation therapy cure lung cancer?", answer: "It can be curative in early stages or palliative in later stages." },
  { question: "How long does it take lung cancer to develop?", answer: "It can take years before symptoms appear." },
  { question: "Can stress cause lung cancer?", answer: "No direct link, but stress can weaken the immune system." },
  { question: "Does lung cancer always show symptoms?", answer: "Not always; many cases are asymptomatic until advanced." },
  { question: "What is lobectomy?", answer: "Surgical removal of a lung lobe affected by cancer." },
  { question: "What are paraneoplastic syndromes?", answer: "Rare disorders triggered by immune responses to cancer." },
  { question: "What is thoracoscopy?", answer: "A minimally invasive procedure to examine the chest cavity." },
  { question: "What is mediastinoscopy?", answer: "A procedure to examine lymph nodes in the chest." },
  { question: "Can lung cancer be detected on an X-ray?", answer: "Sometimes, but small tumors may not be visible." },
  { question: "Does quitting smoking reduce lung cancer risk?", answer: "Yes, significantly, even after many years of smoking." },
  { question: "Can lung cancer cause fatigue?", answer: "Yes, fatigue is a common symptom and side effect of treatment." },
  { question: "What is metastasis?", answer: "The spread of cancer from the primary site to other organs." },
  { question: "What are biomarkers in lung cancer?", answer: "Molecules that indicate the presence of cancer and guide treatment." },
  { question: "How do doctors choose the best treatment?", answer: "Based on cancer type, stage, health status, and genetics." },
  { question: "Can lung cancer be prevented?", answer: "Avoiding risk factors like smoking can help prevent it." },
  { question: "Does alcohol cause lung cancer?", answer: "Alcohol is not a primary cause, but heavy use can contribute to general cancer risk." },
  { question: "Can vitamins help prevent lung cancer?", answer: "There’s no conclusive evidence; a healthy diet is best." },
  { question: "How can families support lung cancer patients?", answer: "Through emotional support, helping with care, and encouraging healthy habits." },
  { question: "Can lung cancer cause shoulder pain?", answer: "Yes, especially if the tumor affects nearby nerves or bones." },
  { question: "What is a carcinoma?", answer: "A type of cancer that begins in skin or tissues lining organs." },
  { question: "What is a bronchoscopy?", answer: "A procedure to view airways and collect tissue samples." },
  { question: "Can lung cancer patients travel?", answer: "Yes, but they should consult their doctor before flying or long trips." },
  { question: "Are there lung cancer support groups?", answer: "Yes, many hospitals and online communities offer support." },
  { question: "Can a healthy person develop lung cancer?", answer: "Yes, especially if exposed to environmental carcinogens." },
  { question: "What are side effects of lung cancer treatment?", answer: "Side effects may include fatigue, nausea, hair loss, and infections." },
  { question: "Can lung cancer affect children?", answer: "It is extremely rare in children." },
  { question: "Does age affect lung cancer risk?", answer: "Yes, risk increases with age, especially after 65." },
  { question: "Can lung cancer cause weight loss?", answer: "Yes, unintentional weight loss is a common symptom." },
  { question: "How can caregivers manage lung cancer care?", answer: "By staying informed, organized, and emotionally supportive." },
  { question: "Can a person with lung cancer work?", answer: "Yes, depending on health and treatment schedule." },
  { question: "How does lung cancer affect daily life?", answer: "It can impact physical, emotional, and social well-being." },
  { question: "What is the global incidence of lung cancer?", answer: "Lung cancer is one of the leading cancers worldwide." },
  { question: "What is the link between TB and lung cancer?", answer: "A history of TB may slightly increase lung cancer risk." },
  { question: "Are breathing exercises helpful for lung cancer?", answer: "Yes, they can improve lung function and quality of life." },
  { question: "Can pets get lung cancer?", answer: "Yes, especially if exposed to smoke or chemicals." },
  { question: "How do you emotionally cope with lung cancer?", answer: "Support groups, counseling, and mindfulness can help." },
  { question: "Is lung cancer considered a disability?", answer: "It may qualify depending on severity and treatment impact." },


  { question: "What is dengue?", answer: "Dengue is a mosquito-borne viral infection causing flu-like symptoms." },
  { question: "How is dengue transmitted?", answer: "Dengue is transmitted by the bite of infected Aedes mosquitoes." },
  { question: "What are the symptoms of dengue?", answer: "Symptoms include high fever, headache, muscle pain, rash, and bleeding." },
  { question: "What causes dengue?", answer: "Dengue is caused by the dengue virus, spread by Aedes aegypti mosquitoes." },
  { question: "Is dengue contagious?", answer: "No, dengue is not spread from person to person directly." },
  { question: "What are the stages of dengue?", answer: "Dengue has three stages: febrile, critical, and recovery." },
  { question: "What is the incubation period for dengue?", answer: "The incubation period is typically 4 to 10 days after the mosquito bite." },
  { question: "Can dengue cause death?", answer: "Yes, severe dengue can cause death if not treated promptly." },
  { question: "What is severe dengue?", answer: "Severe dengue involves plasma leakage, severe bleeding, and organ failure." },
  { question: "Can children get dengue?", answer: "Yes, children are at risk and can develop severe dengue." },
  { question: "What is the treatment for dengue?", answer: "There is no specific treatment; supportive care and hydration are essential." },
  { question: "Is there a vaccine for dengue?", answer: "Yes, Dengvaxia is an approved vaccine in some countries for those with prior infection." },
  { question: "Can dengue be prevented?", answer: "Yes, by avoiding mosquito bites and eliminating breeding sites." },
  { question: "How long does dengue fever last?", answer: "The fever usually lasts 2 to 7 days." },
  { question: "Can you get dengue more than once?", answer: "Yes, there are 4 dengue virus types; infection with one doesn't protect against others." },
  { question: "What is dengue hemorrhagic fever?", answer: "A severe form of dengue with bleeding, low platelets, and plasma leakage." },
  { question: "What is dengue shock syndrome?", answer: "It’s a dangerous complication where blood pressure drops dangerously low." },
  { question: "What are warning signs of severe dengue?", answer: "Signs include severe abdominal pain, persistent vomiting, bleeding, and difficulty breathing." },
  { question: "What lab tests diagnose dengue?", answer: "NS1 antigen, IgM/IgG antibody tests, and PCR are used to confirm dengue." },
  { question: "How is dengue different from malaria?", answer: "Dengue is viral and spread by Aedes mosquitoes; malaria is parasitic and spread by Anopheles mosquitoes." },
  { question: "Can pregnant women get dengue?", answer: "Yes, and it may pose risks to both mother and baby." },
  { question: "Is there a cure for dengue?", answer: "No cure exists; treatment focuses on symptom management." },
  { question: "Can dengue cause rashes?", answer: "Yes, a rash is a common symptom, especially during recovery." },
  { question: "Can you travel with dengue?", answer: "It is not advisable to travel while sick due to risk of complications." },
  { question: "Can dengue spread through water?", answer: "No, it's spread only by infected mosquito bites." },
  { question: "How can I protect myself from dengue?", answer: "Use mosquito repellent, wear protective clothing, and eliminate stagnant water." },
  { question: "Is dengue seasonal?", answer: "Yes, outbreaks often occur during or after the rainy season." },
  { question: "How common is dengue?", answer: "It's very common in tropical and subtropical regions worldwide." },
  { question: "Does dengue cause joint pain?", answer: "Yes, joint and muscle pain are common, often called 'breakbone fever'." },
  { question: "Can dengue cause headaches?", answer: "Yes, especially pain behind the eyes." },
  { question: "Can dengue be asymptomatic?", answer: "Yes, some individuals may not show symptoms." },
  { question: "What is the mortality rate of dengue?", answer: "Less than 1% with proper care; higher without treatment." },
  { question: "How do you treat dengue fever at home?", answer: "Rest, fluids, and paracetamol for fever; avoid aspirin or ibuprofen." },
  { question: "What foods help during dengue?", answer: "Hydrating foods, papaya leaves (traditionally), soups, fruits, and high-fluid intake." },
  { question: "Can dengue affect the liver?", answer: "Yes, it can cause mild to moderate liver inflammation." },
  { question: "What is platelet count?", answer: "It measures blood clotting cells; low platelets are common in dengue." },
  { question: "What is a normal platelet count?", answer: "A normal count ranges from 150,000 to 450,000 per microliter of blood." },
  { question: "Does dengue require hospitalization?", answer: "Mild cases do not, but severe cases must be hospitalized." },
  { question: "Can dengue affect kidneys?", answer: "Yes, especially in severe cases with multi-organ failure." },
  { question: "How long does recovery from dengue take?", answer: "Most people recover in 1–2 weeks." },
  { question: "Can you donate blood after dengue?", answer: "Only after full recovery and a waiting period, usually 6 months." },
  { question: "Are there long-term effects of dengue?", answer: "Most recover fully, but fatigue can last weeks; severe cases may cause lasting damage." },
  { question: "Is dengue more dangerous in adults or children?", answer: "Severe dengue is more common in children, but adults are also at risk." },
  { question: "Can dengue be fatal?", answer: "Yes, without treatment, especially severe dengue." },
  { question: "What is antibody-dependent enhancement in dengue?", answer: "It’s when a second infection with a different strain causes worse illness." },
  { question: "How are dengue outbreaks controlled?", answer: "Vector control, public education, and surveillance are key methods." },
  { question: "Can dengue affect the brain?", answer: "In rare cases, it can cause encephalitis or neurological symptoms." },
  { question: "How long does the virus stay in the body?", answer: "Usually clears within a few weeks after symptoms resolve." },
  { question: "Is dengue endemic in India?", answer: "Yes, dengue is endemic in many Indian states." },
  { question: "What mosquito spreads dengue?", answer: "Aedes aegypti and Aedes albopictus mosquitoes." },
  { question: "When do Aedes mosquitoes bite?", answer: "They typically bite during daylight, especially early morning and late afternoon." },
  { question: "What is the NS1 antigen test?", answer: "A test to detect the dengue virus in early infection." },
  { question: "Can I use paracetamol for dengue fever?", answer: "Yes, it is safe and commonly recommended." },
  { question: "Why avoid aspirin in dengue?", answer: "It can increase bleeding risk by affecting platelets." },
  { question: "What is thrombocytopenia?", answer: "A condition where platelet levels are low, common in dengue." },
  { question: "Does dengue cause dehydration?", answer: "Yes, due to fever and plasma leakage." },
  { question: "Can pets spread dengue?", answer: "No, dengue only spreads through mosquito bites." },
  { question: "Are there home remedies for dengue?", answer: "Only supportive care; some use papaya leaf extract, though it's not medically confirmed." },
  { question: "Can you exercise after recovering from dengue?", answer: "Light activity is fine, but rest is recommended until full recovery." },
  { question: "Can dengue cause bleeding gums?", answer: "Yes, bleeding is a symptom of severe dengue." },
  { question: "How do doctors monitor dengue patients?", answer: "Through vitals, hydration status, and daily blood counts." },
  { question: "What is fluid management in dengue?", answer: "Careful IV fluids are given to maintain circulation and prevent shock." },
  { question: "Can dengue cause anemia?", answer: "It may lead to anemia in some due to blood loss or bone marrow suppression." },
  { question: "How do I know if I have dengue or COVID-19?", answer: "Testing is required; both can cause fever, but symptoms differ slightly." },
  { question: "Can dengue be prevented by nets?", answer: "Mosquito nets are helpful, especially during daytime rest." },
  { question: "Can dengue affect vision?", answer: "Rarely, it may cause visual disturbances due to bleeding or fluid buildup." },
  { question: "Is there a rapid test for dengue?", answer: "Yes, NS1 antigen and IgM antibody rapid tests are available." },
  { question: "Can dengue cause vomiting?", answer: "Yes, especially during the critical phase." },
  { question: "Can dengue be misdiagnosed?", answer: "Yes, early symptoms resemble flu, COVID-19, or other fevers." },
  { question: "Are repellents effective against dengue mosquitoes?", answer: "Yes, DEET and other repellents are effective." },
  { question: "Does climate affect dengue outbreaks?", answer: "Yes, warm and wet climates promote mosquito breeding." },
  { question: "Can dengue affect the heart?", answer: "Rarely, myocarditis (heart inflammation) may occur." },
  { question: "Do all dengue cases need a platelet transfusion?", answer: "No, only if platelets drop critically and there's active bleeding." },
  { question: "What is a dengue outbreak?", answer: "An increase in dengue cases in a specific area during a period." },
  { question: "How does urbanization affect dengue?", answer: "Poor drainage and population density increase mosquito habitats." },
  { question: "Can dengue be sexually transmitted?", answer: "No, dengue is not a sexually transmitted disease." },
  { question: "Are vaccines for dengue safe?", answer: "They are safe for previously infected individuals; not recommended for first-time infection." },
  { question: "Can dengue occur more than once in a year?", answer: "Yes, if infected by different dengue virus types." },
  { question: "What’s the role of WBC in dengue?", answer: "WBC count often drops in dengue; doctors monitor this to assess severity." },
  { question: "Can dengue cause ear or throat pain?", answer: "Not directly, but it may cause general body pain and discomfort." },
  { question: "How long does the dengue virus stay in mosquitoes?", answer: "It stays for the mosquito’s lifetime, and it can transmit the virus anytime." },
  { question: "Can I go to work with dengue?", answer: "No, rest is essential, and working can worsen your condition." },
  { question: "Can dengue lead to ICU admission?", answer: "Yes, in severe cases with shock or organ failure." },
  { question: "Why are dengue cases increasing?", answer: "Due to urbanization, climate change, and poor mosquito control." },
  { question: "Is dengue a viral hemorrhagic fever?", answer: "Yes, it's part of that group, along with Ebola and yellow fever." },
  { question: "Is dengue a notifiable disease?", answer: "Yes, in many countries it must be reported to health authorities." },
  { question: "Can dengue be detected in urine?", answer: "It's rare; blood tests are more accurate." },
  { question: "How can governments control dengue?", answer: "By vector control programs, public awareness, and vaccination where applicable." },
  { question: "Can dengue patients take multivitamins?", answer: "Yes, especially vitamin C and B-complex, if approved by doctors." },
  { question: "Is it safe to take a shower with dengue?", answer: "Yes, but rest and avoid cold water if you have chills." },
  { question: "Can you drink coconut water with dengue?", answer: "Yes, it helps with hydration and electrolytes." },


  { question: "What is malaria?", answer: "Malaria is a mosquito-borne infectious disease caused by Plasmodium parasites." },
  { question: "How is malaria transmitted?", answer: "Malaria is transmitted through the bite of infected female Anopheles mosquitoes." },
  { question: "What are the symptoms of malaria?", answer: "Symptoms include fever, chills, headache, nausea, vomiting, and muscle pain." },
  { question: "What causes malaria?", answer: "Malaria is caused by Plasmodium parasites, primarily P. falciparum, P. vivax, P. ovale, and P. malariae." },
  { question: "Is malaria contagious?", answer: "No, malaria is not spread from person to person directly; it requires a mosquito vector." },
  { question: "What is the incubation period of malaria?", answer: "The incubation period is usually 7 to 30 days depending on the parasite species." },
  { question: "Can malaria be fatal?", answer: "Yes, especially P. falciparum malaria can be severe and fatal if untreated." },
  { question: "How is malaria diagnosed?", answer: "Malaria is diagnosed through blood smears, rapid diagnostic tests (RDTs), or PCR." },
  { question: "What are the complications of malaria?", answer: "Complications include severe anemia, cerebral malaria, kidney failure, and death." },
  { question: "What is cerebral malaria?", answer: "A severe form where malaria parasites affect the brain causing seizures, coma, and death." },
  { question: "How can malaria be prevented?", answer: "Use insecticide-treated nets, indoor spraying, antimalarial drugs, and reduce mosquito breeding." },
  { question: "Is there a vaccine for malaria?", answer: "Yes, the RTS,S vaccine is approved for use in some countries, mainly in children." },
  { question: "What is the treatment for malaria?", answer: "Treatment includes antimalarial drugs like chloroquine, artemisinin-based combination therapies (ACTs), and others." },
  { question: "Can malaria relapse?", answer: "Yes, especially P. vivax and P. ovale can cause relapses due to dormant liver stages." },
  { question: "What is the life cycle of malaria parasite?", answer: "It involves stages in both humans (liver and blood stages) and mosquitoes (sexual stages)." },
  { question: "Can malaria be transmitted from mother to baby?", answer: "Yes, through placental transmission, called congenital malaria." },
  { question: "What mosquito transmits malaria?", answer: "Female Anopheles mosquitoes transmit malaria." },
  { question: "Are all mosquitoes capable of spreading malaria?", answer: "No, only female Anopheles mosquitoes spread malaria." },
  { question: "Can malaria be cured?", answer: "Yes, with prompt and proper antimalarial treatment." },
  { question: "What is drug-resistant malaria?", answer: "Malaria parasites that have evolved to survive despite antimalarial drugs." },
  { question: "What are common antimalarial drugs?", answer: "Chloroquine, artemisinin-based combination therapies (ACTs), quinine, and mefloquine." },
  { question: "What regions are most affected by malaria?", answer: "Sub-Saharan Africa, parts of Asia, Latin America, and Oceania." },
  { question: "Can malaria be prevented with prophylactic drugs?", answer: "Yes, travelers often take prophylactic antimalarials to prevent infection." },
  { question: "What is intermittent preventive treatment (IPT) for malaria?", answer: "Giving antimalarial drugs at scheduled intervals to high-risk groups to prevent infection." },
  { question: "How long does malaria fever last?", answer: "Fever can last days to weeks depending on severity and treatment." },
  { question: "What is severe malaria?", answer: "Malaria with complications such as organ failure, severe anemia, or cerebral involvement." },
  { question: "Can malaria cause anemia?", answer: "Yes, due to destruction of red blood cells by the parasite." },
  { question: "What is the difference between P. falciparum and P. vivax?", answer: "P. falciparum causes the most severe disease; P. vivax can cause relapses and is more widespread." },
  { question: "Are children more vulnerable to malaria?", answer: "Yes, children under five have higher risk of severe disease and death." },
  { question: "Can malaria cause seizures?", answer: "Yes, especially in cerebral malaria." },
  { question: "What preventive measures reduce mosquito breeding?", answer: "Eliminating standing water, proper sanitation, and use of larvicides." },
  { question: "Can malaria affect pregnant women?", answer: "Yes, it can cause complications including miscarriage and low birth weight." },
  { question: "What is asymptomatic malaria?", answer: "Infection without symptoms but with parasites in the blood, can still transmit malaria." },
  { question: "How does malaria affect the liver?", answer: "The parasite initially infects liver cells before entering the bloodstream." },
  { question: "What is the role of mosquitoes in malaria?", answer: "They act as vectors transmitting the parasite between humans." },
  { question: "Can malaria be diagnosed without blood tests?", answer: "No, blood tests are required for confirmation." },
  { question: "How can you reduce risk of malaria while traveling?", answer: "Use nets, repellents, prophylactic drugs, and avoid mosquito bites." },
  { question: "What is the difference between malaria and dengue?", answer: "Malaria is caused by parasites; dengue is a viral disease, both transmitted by different mosquitoes." },
  { question: "How does climate change affect malaria?", answer: "Warmer temperatures can expand mosquito habitats, increasing malaria risk." },
  { question: "What are the symptoms of malaria relapse?", answer: "Similar to primary infection: fever, chills, sweats, and fatigue." },
  { question: "What is the significance of gametocytes in malaria?", answer: "They are the sexual forms that mosquitoes ingest to continue the life cycle." },
  { question: "What is the global burden of malaria?", answer: "Millions of cases and hundreds of thousands of deaths occur annually, mainly in Africa." },
  { question: "Can malaria cause kidney failure?", answer: "Yes, severe malaria can lead to acute kidney injury." },
  { question: "What is the difference between uncomplicated and complicated malaria?", answer: "Uncomplicated has mild symptoms; complicated involves organ dysfunction and severe symptoms." },
  { question: "What role do insecticide-treated nets play?", answer: "They protect against mosquito bites and reduce malaria transmission." },
  { question: "Can malaria parasites survive outside the human body?", answer: "No, they require a human or mosquito host to survive." },
  { question: "What is plasmodium?", answer: "The genus of parasites that cause malaria." },
  { question: "What happens during the blood stage of malaria?", answer: "Parasites infect red blood cells causing symptoms like fever and anemia." },
  { question: "Is malaria seasonal?", answer: "Yes, cases rise during and after rainy seasons in endemic areas." },
  { question: "Can malaria be spread through blood transfusion?", answer: "Yes, if infected blood is transfused." },
  { question: "What is malaria prophylaxis?", answer: "Use of antimalarial drugs to prevent infection in high-risk areas." },
  { question: "Can malaria cause respiratory problems?", answer: "Severe malaria can cause acute respiratory distress syndrome (ARDS)." },
  { question: "What is the mosquito life cycle?", answer: "Egg, larva, pupa, and adult stages." },
  { question: "Why is early diagnosis important in malaria?", answer: "To start treatment early and prevent severe disease or death." },
  { question: "How long does malaria treatment last?", answer: "Typically 3 to 7 days depending on the medication used." },
  { question: "Can malaria be diagnosed at home?", answer: "No, proper diagnosis requires lab tests." },
  { question: "What is quinine?", answer: "An older antimalarial drug used for treatment of severe malaria." },
  { question: "Can malaria be prevented by vaccination alone?", answer: "No, vaccination is one part of prevention alongside mosquito control." },
  { question: "What is drug resistance in malaria?", answer: "When parasites survive despite standard drug treatment." },
  { question: "Can malaria cause fatigue?", answer: "Yes, prolonged illness causes significant tiredness." },
  { question: "How do mosquitoes become infected with malaria?", answer: "By biting an infected person carrying gametocytes." },
  { question: "What is the difference between male and female mosquitoes?", answer: "Only females bite and transmit malaria." },
  { question: "What are malaria hotspots?", answer: "Areas with high transmission rates of malaria." },
  { question: "Can malaria cause jaundice?", answer: "Yes, due to liver involvement and hemolysis." },
  { question: "Can malaria cause splenomegaly?", answer: "Yes, the spleen often enlarges during infection." },
  { question: "What is the significance of the Anopheles mosquito biting at night?", answer: "It increases risk of malaria transmission during sleeping hours." },
  { question: "What is the role of PCR in malaria diagnosis?", answer: "Highly sensitive method to detect low levels of parasites." },
  { question: "What precautions should be taken in malaria endemic areas?", answer: "Use nets, repellents, avoid stagnant water, and seek early treatment." },
  { question: "Can malaria cause mental confusion?", answer: "Yes, especially in cerebral malaria." },
  { question: "How does malaria affect red blood cells?", answer: "Parasites invade and destroy red blood cells." },
  { question: "What is the global strategy to fight malaria?", answer: "Combination of prevention, diagnosis, treatment, and surveillance." },
  { question: "How does insecticide resistance affect malaria control?", answer: "It reduces effectiveness of mosquito control methods." },
  { question: "What is the recommended treatment for P. falciparum malaria?", answer: "Artemisinin-based combination therapies (ACTs)." },
  { question: "Can malaria be prevented during pregnancy?", answer: "Yes, through intermittent preventive treatment and bed nets." },
  { question: "What is a malaria epidemic?", answer: "A sudden increase in malaria cases above normal levels." },
  { question: "Can malaria be eradicated?", answer: "Efforts are ongoing, but eradication is challenging due to many factors." },
  { question: "What is the role of community health workers in malaria control?", answer: "They help with diagnosis, treatment, education, and distribution of nets." },
  { question: "What are common signs of severe malaria?", answer: "Seizures, coma, severe anemia, respiratory distress, and organ failure." },
  { question: "Can malaria cause low birth weight?", answer: "Yes, especially if pregnant women are infected." },
  { question: "What is the role of environmental management in malaria control?", answer: "Reducing mosquito breeding sites to lower transmission." },
  { question: "What is the duration of malaria parasite survival in the mosquito?", answer: "Typically 10-14 days for parasite development." },
  { question: "Can malaria cause hypoglycemia?", answer: "Yes, especially in severe malaria and during treatment." },
  { question: "What is the difference between relapse and recrudescence in malaria?", answer: "Relapse is from dormant liver stages; recrudescence is recurrence from blood stages due to inadequate treatment." },
  { question: "What is a rapid diagnostic test (RDT) for malaria?", answer: "A quick test that detects malaria antigens in blood." },
  { question: "Can malaria affect the heart?", answer: "Severe malaria can cause cardiovascular complications." },
  { question: "What is the significance of the spleen in malaria?", answer: "It filters infected red blood cells and contributes to immune response." },
  { question: "How does indoor residual spraying work?", answer: "Applying insecticides on walls to kill mosquitoes resting indoors." },
  { question: "Can malaria cause repeated fever cycles?", answer: "Yes, the parasite lifecycle causes periodic fever spikes." },
  { question: "How is malaria surveillance done?", answer: "Monitoring cases through reporting systems to track and control outbreaks." },
  { question: "What is the effect of HIV on malaria?", answer: "HIV can increase susceptibility to malaria and worsen outcomes." },
  { question: "Can malaria be transmitted through organ transplantation?", answer: "Yes, if the donor is infected." },
  { question: "What is the role of genetics in malaria susceptibility?", answer: "Certain genetic traits like sickle cell provide some protection against malaria." },
  { question: "What is malaria elimination?", answer: "Reducing malaria cases to zero in a defined geographic area." },
  { question: "Can malaria be prevented by wearing protective clothing?", answer: "Yes, it reduces mosquito bites but is not fully protective alone." },
  { question: "What is the WHO recommendation for malaria prevention?", answer: "Use of insecticide-treated nets, indoor spraying, diagnosis and treatment." },
];


  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const getLevenshteinDistance = (a, b) => {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[b.length][a.length];
  };

  const findClosestQuestion = (userQuestion) => {
    const keywords = ['liver', 'lung', 'cancer', 'dengue', 'malaria'];
    const userQuestionLower = userQuestion.toLowerCase();

    const isRelevant = keywords.some(keyword => userQuestionLower.includes(keyword));
    if (!isRelevant) return null;

    let closestQuestion = null;
    let closestDistance = Infinity;

    qaData.forEach((qa) => {
      const distance = getLevenshteinDistance(userQuestionLower, qa.question.toLowerCase());
      if (distance < closestDistance) {
        closestDistance = distance;
        closestQuestion = qa;
      }
    });

    return closestQuestion;
  };

  const handleUserInput = () => {
    const userQuestion = input.trim();
    if (userQuestion) {
      setChatLog((prevLog) => [...prevLog, { type: 'user', text: userQuestion }]);
      setInput('');
      setIsThinking(true);

      setTimeout(() => {
        const closestQA = findClosestQuestion(userQuestion);
        const response = closestQA
          ? closestQA.answer
          : "Please ask a valid question related to liver disease, lung cancer, dengue, or malaria.";

        setChatLog((prevLog) => [...prevLog, { type: 'bot', text: response }]);
        setIsThinking(false);
      }, 5000);
    }
  };

  return (
    <div>
      <div className="chat-button" onClick={toggleChat}>
        <FontAwesomeIcon icon={faFacebookMessenger} size="2x" />
      </div>

      {isOpen && (
        <div className="chat-box">
          <div className="chat-header">
            <span>Chat with us</span>
            <button className="close-btn" onClick={toggleChat}>X</button>
          </div>
          <div className="chat-body">
            {chatLog.map((log, index) => (
              <p key={index} className={log.type === 'user' ? 'user-message' : 'bot-message'}>
                {log.text}
              </p>
            ))}
            {isThinking && <p className="bot-message thinking">...</p>}
          </div>
          <div className="chat-footer">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleUserInput()}
            />
            <button onClick={handleUserInput}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
