package com.romanticquest.model;

import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;
import org.springframework.web.context.WebApplicationContext;

import java.io.Serializable;

@Component
@Scope(value = WebApplicationContext.SCOPE_SESSION, proxyMode = ScopedProxyMode.TARGET_CLASS)
public class QuestProgress implements Serializable {

    private boolean journeyStarted = false;
    private boolean bitwisePuzzleCompleted = false;
    private boolean base64PuzzleCompleted = false;
    private boolean asciiPuzzleCompleted = false;
    private boolean apiPuzzleCompleted = false;

    public boolean isJourneyStarted() {
        return journeyStarted;
    }

    public void setJourneyStarted(boolean journeyStarted) {
        this.journeyStarted = journeyStarted;
    }

    public boolean isBitwisePuzzleCompleted() {
        return bitwisePuzzleCompleted;
    }

    public void setBitwisePuzzleCompleted(boolean bitwisePuzzleCompleted) {
        this.bitwisePuzzleCompleted = bitwisePuzzleCompleted;
    }

    public boolean isBase64PuzzleCompleted() {
        return base64PuzzleCompleted;
    }

    public void setBase64PuzzleCompleted(boolean base64PuzzleCompleted) {
        this.base64PuzzleCompleted = base64PuzzleCompleted;
    }

    public boolean isAsciiPuzzleCompleted() {
        return asciiPuzzleCompleted;
    }

    public void setAsciiPuzzleCompleted(boolean asciiPuzzleCompleted) {
        this.asciiPuzzleCompleted = asciiPuzzleCompleted;
    }

    public boolean isApiPuzzleCompleted() {
        return apiPuzzleCompleted;
    }

    public void setApiPuzzleCompleted(boolean apiPuzzleCompleted) {
        this.apiPuzzleCompleted = apiPuzzleCompleted;
    }

    public boolean isAllPuzzlesCompleted() {
        return bitwisePuzzleCompleted && base64PuzzleCompleted && asciiPuzzleCompleted && apiPuzzleCompleted;
    }

    public int getCompletedCount() {
        int count = 0;
        if (bitwisePuzzleCompleted) count++;
        if (base64PuzzleCompleted) count++;
        if (asciiPuzzleCompleted) count++;
        if (apiPuzzleCompleted) count++;
        return count;
    }

    public void reset() {
        journeyStarted = false;
        bitwisePuzzleCompleted = false;
        base64PuzzleCompleted = false;
        asciiPuzzleCompleted = false;
        apiPuzzleCompleted = false;
    }
}
