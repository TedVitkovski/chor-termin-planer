import React from 'react';
import { Button, Container, Tab, Menu } from "semantic-ui-react";
import Toggle from "react-toggle";

import "../../styles/ToggleButton.css";

const monthYearStyle = {
    fontSize: '23px',
    fontWeight: '900',
    cursor: 'auto',
    minWidth: '250px'
}

const View = ({
    prevMonth, nextMonth, verticalPanes, getMonthYear
}) => (
    <div>
        <Container
            textAlign="center"
            style={{ marginBottom: "3em", marginTop: "3em" }}
        >
            <Button.Group basic>
                <Button
                    labelPosition="left"
                    icon="left chevron"
                    content="Letzter Monat"
                    onClick={prevMonth}
                />
                <Button
                    style={ monthYearStyle }
                    content={getMonthYear()}
                />
                <Button
                    labelPosition="right"
                    icon="right chevron"
                    content="Nächster Monat"
                    onClick={nextMonth}
                />
            </Button.Group>
        </Container>

        <Tab
            menu={{
                fluid: true, 
                vertical: true, 
                tabular: "left" 
            }}
            panes={
                verticalPanes[getMonthYear()]
            }
        />
    </div>
)

export default View;