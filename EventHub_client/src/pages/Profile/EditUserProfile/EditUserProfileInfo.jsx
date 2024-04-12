import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    Input,
    Select,
    DatePicker,
    Checkbox,
    AutoComplete,
    message,
  } from "antd";
import { getUserById } from "../../../api/getUserById";
import CloseWindowButton from "../../../components/Buttons/CloseWindowButton/CloseWindowButton"
import CancelButton from "../../../components/Buttons/CancelButton/CancelButton"
import ApplyChangesButton from "../../../components/Buttons/ApplyChangesButton/ApplyChangesButton"
import styles from "./EditUserProfile.module.css";


const EditUserProfile = ({handleClose}) => {
    const { TextArea } = Input;
    const { Option } = Select;
    
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    useEffect(()=>{
        async function fetchUser() {
            try {
              const response = await getUserById(userId);
              setUser(response);
            } catch (error) {
              console.error("Error fetching user:", error);
            } 
          }
          fetchUser();
    }, [])
    return(
        <div className={styles.OuterContainer}>
            <form className={styles.InnerContainer}>
                <div className={styles.Header}>
                    <p className={styles.Heading}>Edit account information</p>
                    <CloseWindowButton onClick={handleClose}/>
                </div>
                <div className={styles.Main}>
                    <div className={styles.Photos}>
                        <div className={styles.Photo}>Hello</div>
                        <div className={styles.Photo}>Hello</div>
                        <div className={styles.Photo}>Hello</div>
                        <div className={styles.Photo}>Hello</div>
                    </div>
                    <div className={styles.MainInfo}>
                        <div className={styles.InputContainer}>
                            <p className={styles.Caption}>Name</p>
                            <Input
                                placeholder="Name"
                                className={styles.Param}
                            />
                        </div>
                        <div className={styles.InputContainer}>
                            <p className={styles.Caption}>Surname</p>
                            <Input
                                placeholder="Surname"
                                className={styles.Param} 
                            />
                        </div>
                        <div className={styles.InputContainer}>
                            <p className={styles.Caption}>Nickname</p>
                            <Input
                                placeholder="Nickname"
                                className={styles.Param}
                            />
                        </div>
                        <div className={styles.InputContainer}>
                            <p className={styles.Caption}>Address</p>
                            <Input
                                placeholder="Address"
                                className={styles.Param}   
                            />
                        </div>
                        <div className={styles.InputContainer}>
                            <p className={styles.Caption}>Gender</p>
                            <Select
                              placeholder="Gender"
                              className={styles.Select}
                            >
                               <Option value="nfkd" className={styles.Param}>

                                </Option>
                            </Select>
                        </div>
                        <div className={styles.InputContainer}>
                            <p className={styles.Caption}>Birthday</p>
                            <DatePicker className={styles.Param}/>
                        </div>
                    </div>
                </div>
                <div className={styles.Description}>
                    <p className={styles.Caption}>About</p>
                    <TextArea
                        autoSize={{ minRows: 4, maxRows: 4 }}
                        placeholder="Enter description..."
                        className={styles.TextArea}
                    />
                </div>
                <div className={styles.Buttons}>
                    <CancelButton/>
                    <ApplyChangesButton/>
                </div>
            </form>
        </div>
    );
}

export default EditUserProfile