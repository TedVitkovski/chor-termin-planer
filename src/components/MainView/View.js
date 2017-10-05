import React from 'react';
import { Button, Container, Tab, Radio, Menu } from "semantic-ui-react";
import Toggle from "react-toggle";

import "../../styles/ToggleButton.css";

import FadeTransition from '../../animations/FadeTransition.js';
import TransitionGroup from "react-transition-group/TransitionGroup";

const View = ({
    onClick, prevMonth, nextMonth, verticalPanes, getMonthYear
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
                    onClick={onClick}
                    style={{
                        fontSize: "23px",
                        fontWeight: "900",
                        cursor: "auto",
                        minWidth: "250px"
                    }}
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
            menu={{ fluid: true, vertical: true, tabular: "left" }}
            panes={verticalPanes[getMonthYear()]}
        />
    </div>
)

export default View;